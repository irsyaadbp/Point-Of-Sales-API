'use-strict';

require('dotenv/config');

const express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    logger = require('morgan');

const Router = require('./src/Routes/index');

const server = express(),
    port = process.env.PORT || 3000,
    nodeEnv = 'Development';

server.listen(port, () => {
    console.log(`Server is running with port ${port} in ${nodeEnv}`);
});

server.use(cors());
server.use(logger('dev'));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
    extended:false
}));

server.use('/', Router);

module.exports = server;
    