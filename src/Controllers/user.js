'use-strict';

const model = require('../Models/user'),
    response = require('../Helpers/response'),
    { pagination } = require('../Models/page'),
    bcrypt = require('bcrypt'),
    jwt = require('jsonwebtoken'),
    secretKey = process.env.SECRET_KEY || 270400;

exports.registerUser = (req, res) => {
    if (req.body.username == null) return response.error(res, "Username can't be empty");
    if (req.body.password == null) return response.error(res, "Password can't be empty");
    if (req.body.user_role == null) return response.error(res, "User role can't be empty");

    model.registerUser(req).then(result => {
        response.success(res, "User created successfully");
    }).catch(err => {
        response.error(res, err);
    })
}

exports.loginUser = (req, res) => {
    if (req.body.username == null) return response.error(res, "Username can't be empty");
    if (req.body.password == null) return response.error(res, "Password can't be empty");
    
    model.loginUser(req).then(result => {
        if(result.length != 0){
            if(bcrypt.compareSync(req.body.password, result[0].password)){
                const token = jwt.sign({id: result[0].id}, secretKey, {expiresIn: '1h'});
                response.success(res, {user_id: result[0].id, username: result[0].username, token: token});
            }else{
                response.error(res, "Password incorrect")
            }
        }else{
            response.error(res, "User not found")
        }
    })
}