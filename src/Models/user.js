'use-strict';

const conn = require('../Configs/conn');
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);

exports.registerUser = req => {
    const body = req.body
    const pass = bcrypt.hashSync(body.password, salt);
    return new Promise((resolve, reject) => {

        conn.query(`INSERT INTO tb_users SET username = ?, password = ?, role = ?`,
            [body.username, pass, body.user_role],
            (err, result) => {
                if(!err) resolve(result);
                else reject(err);
            });
    });
}

exports.loginUser = req => {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT * FROM tb_users WHERE username = ?`, [req.body.username],
        (err, result) => {
            if(!err) resolve(result);
            else reject(err);
        })
    })
}