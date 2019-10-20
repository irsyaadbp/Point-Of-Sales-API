'use-strict';

const conn = require('../Configs/conn'), 
    bcrypt = require('bcrypt'),
    salt = bcrypt.genSaltSync(10),
    {getMaxPage} = require('./page');

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
        });
    });
}

exports.updateUser = req => {
    const body = req.body;
    const pass = bcrypt.hashSync(body.password, salt);
    return new Promise((resolve, reject) => {
        
        conn.query(`UPDATE tb_users SET username = ?, password = ?, role = ? WHERE id = ?`, [req.body.username, pass, req.body.user_role, req.params.user_id], (err, result) => {
            if(!err) resolve(result);
            else reject(err);
        });
    })
}

exports.getUserList = (req, page) => {
    let sql = 'SELECT id, username, role, created_at, updated_at FROM tb_users';
    return new Promise((resolve, reject) => {
        getMaxPage(page, null, "tb_users").then(maxPage => {
            const infoPage = {
                currentPage: page.page,
                totalAllUsers: maxPage.totalProduct,
                maxPage: maxPage.maxPage
            };

            conn.query(`${sql} LIMIT ? OFFSET ?`, [page.limit, page.offset], (err, data) => {
                if (!err) resolve({
                    infoPage,
                    data
                });
                else reject(err);
            });
        });
    });
}

exports.getUserById = req => {
    const userId = req.params.user_id || req.body.user_id;
    return new Promise((resolve, reject) => {
        conn.query('SELECT id, username, role, created_at, updated_at FROM tb_users WHERE id = ?', [userId],
        (err, result) => {
            if(!err) resolve(result);
            else reject(err);
        });
    });
}

exports.getUserByName = req => {
    const username = req.params.username || req.body.username;
    return new Promise((resolve, reject) => {
        conn.query('SELECT id, username, role, created_at, updated_at FROM tb_users WHERE username = ?', [username],
        (err, result) => {
            if(!err) resolve(result);
            else reject(err);
        });
    });
}