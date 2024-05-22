const CryptoJS = require('crypto-js');
const db = require('../db/connection');
const { uuid } = require('uuidv4');
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
                    exp: Math.floor(Date.now() / 1000) + parseInt(process.env.sessionExpiration),
                    data: rows[0],
                }, process.env.jwtSecret);
                response = {
                    status: true,
                    reason: 'Username and password matched',
                    token: token
                }
            }
            else {
                response = {
                    status: false,
                    reason: 'Password does not match'
                }
            }
        }
        return response;
    });
}

exports.updatePassword = function (username, oldPassword, newPassword) {
    let response;
    let query = 'SELECT * from ' + process.env.dbName + '.users where username = \'' + username + '\'';
    return db.runQuery(query).then(function (rows) {
        if (rows.length === 0) {
            response = {
                status: false,
                reason: 'Username does not match'
            }
            return response;
        } else {
            let bytes = CryptoJS.AES.decrypt(rows[0].password, process.env.cryptoSecret);
            let pass = bytes.toString(CryptoJS.enc.Utf8);
            if (pass === oldPassword) {
                if (newPassword === undefined || newPassword === null) {
                    response = {
                        status: false,
                        reason: 'New Password is undefined or null'
                    }
                    return response;
                }
                else {
                    bytes = CryptoJS.AES.encrypt(newPassword, process.env.cryptoSecret);
                    query = 'UPDATE ' + process.env.dbName + '.users SET password = \'' + bytes + '\' WHERE username = \'' + username + '\'';
                    return db.runQuery(query).then(function (rows) {
                        response = {
                            status: true,
                            reason: 'New Password updated successfully',
                            log: rows
                        }
                        return response;
                    })
                }
            }
            else {
                response = {
                    status: false,
                    reason: 'Password does not match'
                }
                return response;
            }
        }

    });
}

exports.createUser = function (username, password) {
    let userId = uuid();
    let response;
    let checkUserName = 'SELECT * from ' + process.env.dbName + '.users where username = \'' + username + '\'';
    return db.runQuery(checkUserName).then(function (rows) {
        if (rows.length === 0) {
            let bytes = CryptoJS.AES.encrypt(password, process.env.cryptoSecret);
            let query = 'INSERT INTO ' + process.env.dbName + '.users (id, username, password) VALUES (\'' + userId + '\' ,\'' + username + '\' , \'' + bytes + '\')';
            return db.runQuery(query).then(function (row) {
                response = {
                    status: true,
                    reason: 'User signed up successfully',
                    log: row
                }
                return response;
            })
        }
        else {
            response = {
                status: false,
                reason: 'Username already exists'
            }
            return response;
        }
    })

}

exports.removeUser = function (username, password) {
    let response;
    let checkUserName = 'SELECT * from ' + process.env.dbName + '.users where username = \'' + username + '\'';
    return db.runQuery(checkUserName).then(function (rows) {
        if (rows.length != 0) {
            let bytes = CryptoJS.AES.decrypt(rows[0].password, process.env.cryptoSecret);
            let pass = bytes.toString(CryptoJS.enc.Utf8);
            if (pass === password) {
                let query = 'DELETE from ' + process.env.dbName + '.users WHERE username=\'' + username + '\'';
                return db.runQuery(query).then(function (row) {
                    response = {
                        status: true,
                        reason: 'User deleted successfully',
                        log: row
                    }
                    return response;
                })
            }
            else {
                response = {
                    status: false,
                    reason: 'Password does not match'
                }
                return response;
            }
        }
        else {
            response = {
                status: false,
                reason: 'Username does not exist to delete'
            }
            return response;
        }
    })
}
