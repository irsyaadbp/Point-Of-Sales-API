'use-strict';

require('dotenv/config');

const express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    logger = require('morgan');

const Router = require('./src/Routes/index');

const server = express(),
    port = process.env.PORT || 5000,
    nodeEnv = 'Development';

server.use(cors());

server.listen(port, () => {
    console.log(`Server is running with port ${port} in ${nodeEnv}`);
});

server.use(logger('dev'));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
    extended:false
}));

server.use('/', Router);

module.exports = server;
    