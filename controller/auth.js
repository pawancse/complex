const CryptoJS = require('crypto-js');
const db = require('../db/connection');
const jwt = require('jsonwebtoken');

exports.login = function (username, password) {
    let response;
    let query = 'SELECT * from ' + process.env.dbName + '.users where username = \'' + username + '\'';
    return db.runQuery(query).then(function (rows) {
        if (rows.length === 0) {
            response = {
                status: false,
                reason: 'Username does not match'
            }
        } else {
            let bytes = CryptoJS.AES.decrypt(rows[0].password, process.env.cryptoSecret);
            let pass = bytes.toString(CryptoJS.enc.Utf8);
            if (pass === password) {
                let token = jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + (60 * 30),
                    data: rows[0],
                }, process.env.jwtSecret);
                response = {
                    status: true,
                    reason: 'Username and password matched',
                    token: token,
                    data: {
                        user: rows[0]
                    }
                }
            }
            else {
                response = {
                    status: true,
                    reason: 'Password does not match'
                }
            }
        }
        return response;
    });
}

exports.tokenValidation = function (token) {
    try {
        var decoded = jwt.verify(token, process.env.jwtSecret);
        return decoded;
    } catch (err) {
        return null;
    }
}