const db = require('../db/connection');
const jwt = require('jsonwebtoken');
exports.getDashboardData = function (token) {
    let decodedToken = jwt.decode(token, process.env.jwtSecret);
    decodedToken.data.password = undefined;
    decodedToken.exp = undefined;
    decodedToken.iat = undefined;
    return decodedToken;
    /* let response;
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
     */
}