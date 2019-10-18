'use-strict';

const express = require('express'),
    product = require('./product'),
    category = require('./category'),
    order = require('./order');

const Router = express.Router();

Router.get('/', (req, res) => {
    res.json({
        message: "Welcome to Point Of Sales RESTful API, You can read the documentation at README.md",
        author: "Irsyaad Budi Prasetianto",
        email: "irsyaad.budip@gmail.com",
        github: "github.com/irsyaadbp"
    });
})
Router.use('/product', product);
Router.use('/category', category);
Router.use('/order', order);

module.exports = Router;