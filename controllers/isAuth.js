const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports = (request, response, next) => {

    const bearerHeader = request.headers['authorization'];
    if(bearerHeader){

        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];

        jwt.verify(bearerToken, 'h8SIJ0Av9eloEvPL2dJDpKawvru7WQFS', (err,authData) => {
            if(err){
                return response.sendStatus(403);
            } else {
                User.findById(authData._id)
                .then(account => {
                    request.token = bearerToken;
                    request.account = account;
                    next();
                })
                .catch(err => {
                    return response.sendStatus(403);
                })
            }
        })

    } else {
        return response.sendStatus(403);
    }


}