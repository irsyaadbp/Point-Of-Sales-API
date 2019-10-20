const response = require('../Helpers/response'),
    jwt = require('jsonwebtoken'),
    secretKey = process.env.SECRET_KEY || '270400';

exports.validateUser = (req, res, next) => {
    jwt.verify(req.headers['x-access-token'], secretKey, (err, decoded) => {
        if (err) {
            response.error(res, err.message);
        } else {
            req.body.user_id = decoded.id;
            req.body.username = decoded.username;
            next();
        }
    });
}