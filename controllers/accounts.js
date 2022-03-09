const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const bcryptjs = require('bcryptjs');

//MODELS
const User = require('../models/user');

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

    



    //Response
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



module.exports = router;