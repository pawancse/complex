const jwt = require('jsonwebtoken');
exports.validateToken = function (token) {
    try {
        jwt.verify(token, process.env.jwtSecret);
        return true;
    } catch (err) {
        return err;
    }
}