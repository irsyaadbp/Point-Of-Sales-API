'use-strict';

const express = require('express'),
    product = require('./product'),
    category = require('./category'),
    order = require('./order'),
    user = require('./user'),
    response = require('../Helpers/response'),
    jwt = require('jsonwebtoken')
    secretKey = process.env.SECRET_KEY || 270400;

const Router = express.Router();

const validateUser = (req, res, next) => {
    jwt.verify(req.headers['x-access-token'], secretKey, (err, decoded) => {
      if (err) {
        response.error(res, err.message);
      }else{
        req.body.user_id = decoded.id;
        next();
      }
    });
  }

Router.get('/', (req, res) => {
    res.json({
        message: "Welcome to Point Of Sales RESTful API, You can read the documentation at README.md",
        author: "Irsyaad Budi Prasetianto",
        email: "irsyaad.budip@gmail.com",
        github: "github.com/irsyaadbp"
    });
})


Router.use('/product', validateUser, product);
Router.use('/category', validateUser, category);
Router.use('/order', validateUser, order);
Router.use('/user', user);



module.exports = Router;