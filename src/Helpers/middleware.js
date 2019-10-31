const response = require('../Helpers/response'),
    jwt = require('jsonwebtoken'),
    secretKey = process.env.SECRET_KEY || '270400';

exports.validateUser = (req, res, next) => {
    const token = req.headers['authorization'].replace('Bearer ', '');
    if(!token) return res.status(401).json({status:401, message: "Unauthorized"});
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            response.error(res, "Invalid token");
        } else {
            req.body.user_id = decoded.id;
            req.body.username = decoded.username;
            next();
        }
    });
}