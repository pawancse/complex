const mysql = require('mysql2')
const connection = mysql.createConnection({
    host: process.env.dbHost,
    port: process.env.dbPort,
    user: process.env.dbUser,
    password: process.env.dbPassword,
    database: process.env.dbName
});

exports.getConnection = function () {
    return connection;
}

exports.createConnection = function () {
    connection.connect();
};

exports.endConnection = function () {
    connection.end();
};

exports.runQuery = function (query) {
    return new Promise(function (resolve, reject) {
        return connection.query(query, (err, rows) => {
            if (err) reject(err);
            resolve(rows);
        });
    });
};