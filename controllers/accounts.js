const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const isAuth = require('./isAuth');

//MODELS
const User = require('../models/user');
const Store = require('../models/store');

//CREATE ACCOUNT
router.post('/createAccount', async(request, response) => {
    //Get user inputs
    const { firstName, lastName, email, password, mobile } = request.body;
    //Check if user exist
    User.findOne({ email: email })
    .then(async account => {
        if(account){
            return response.status(200).json({
                message: 'User is already exist, Please try other email'
            });
        } else {
            //Crypt password
            const formatted_password = await bcryptjs.hash(password, 10);
            //Generate passcode
            const passcode = generateRandomIntegerInRange(1000,9999);

            //Create user in mongoDB
            const _user = new User({
                _id: mongoose.Types.ObjectId(),
                email: email,
                password: formatted_password,
                mobile: mobile,
                firstName: firstName,
                lastName: lastName,
                passcode: passcode
            })
            _user.save()
            .then(account_created => {
                return response.status(200).json({
                    message: account_created
                });
            })
        }  
    })
    .catch(err => {
        return response.status(500).json({
            message: err
        });
    })
})
//LOGIN
router.post('/login', async(request, response) => {
    //Get user credentials
    const {email,password} = request.body;
    //Is user exist
    User.findOne({email: email})
    .then(async account => {
        if(account){
            //Is Verified Is locked
            if(account.isApproved && !account.isLocked){
                //Compare passwords
                const isMatch = await bcryptjs.compare(password, account.password);
                if(isMatch){
                    //Create TOKEN
                    const acc_data = {
                        firstName: account.firstName,
                        lastName: account.lastName,
                        avatar: account.avatar,
                        mobile: account.mobile,
                        email: account.email,
                        _id: account._id
                    };
                    const token = await jwt.sign(acc_data, 'h8SIJ0Av9eloEvPL2dJDpKawvru7WQFS');
                    return response.status(200).json({
                        token: token
                    });
                } else {
                    return response.status(200).json({
                        message: 'Your password is not match'
                    });
                }
            } else {
                return response.status(200).json({
                    message: 'Your account is not active'
                });
            }
        } else {
            return response.status(200).json({
                message: 'User not found'
            });
        }
    })
    .catch(err => {
        return response.status(500).json({
            message: err
        });
    })
});
//VERIFY PASSCODE
router.post('/verify', async(request, response) => {
    //Get passcode and email
    const { email,passcode } = request.body;
    //Is user exist
    User.findOne({email: email})
    .then(async account => {
        if(account){
            //Verify code
            if(account.passcode == passcode){
                //Update isApproved
                account.isApproved = true;
                account.save()
                .then(account_updated => {
                    //Response
                    return response.status(200).json({
                        message: account_updated
                    });
                })
            } else {
                return response.status(200).json({
                    message: 'Passcode not match'
                });
            }
        } else {
            return response.status(200).json({
                message: 'User not found'
            });
        }
    })
    .catch(err => {
        return response.status(500).json({
            message: err
        });
    })
});
//FORGET PASSWORD
router.post('/forgetPassword', async(request,response) => {
    //Get user email
    const email = request.body.email;
    //Is user exist
    User.findOne({email: email})
    .then(async account => {
        if(account){
            const passcode = generateRandomIntegerInRange(1000,9999);
            account.passcode = passcode;
            account.save()
            .then(account_updated => {
                return response.status(200).json({
                    message: account_updated.passcode
                });
            })
        } else {
            return response.status(200).json({
                message: 'User not exist'
            });
        }
    })
    .catch(err => {
        return response.status(500).json({
            message: err
        });
    })
})
router.post('/updateNewPassword', async(request, response) => {
    const {email,newpassword} = request.body;
    User.findOne({email: email})
    .then(async account => {
        if(account){
            const formatted_password = await bcryptjs.hash(newpassword, 10);
            account.password = formatted_password;
            account.save()
            .then(account_updated => {
                return response.status(200).json({
                    message: account_updated
                });
            })
        } else {
            return response.status(200).json({
                message: 'User not exist'
            });
        }
    })
    .catch(err => {
        return response.status(500).json({
            message: err
        });
    })
})
function generateRandomIntegerInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
router.get('/sayHello', async(request, response) => {
    try {
        const users = await User.find();
        return response.status(200).json({
            message: users
        });
    } catch (error) {
        return response.status(500).json({
            message: error
        });
    }
    
})

router.get('/getUserData', isAuth, async(request,response) => {
    const id = request.account._id;
    const store = await Store.findOne({associateId: id}).populate('associateId');
    return response.status(200).json({
        data: store
    });
})








module.exports = router;