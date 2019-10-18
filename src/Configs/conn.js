'use-strict';

const mysql = require('mysql');

const dbConfig = mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "user",
    password: process.env.DB_PASSWORD || "password",
    database: process.env.DB_DATABASE || "database",
    multipleStatements: true,
});

dbConfig.connect(err => {
    if (err) throw err
});

module.exports = dbConfig;