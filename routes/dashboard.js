const express = require('express');
const router = express.Router();
const common = require('../controller/common');
const dashboard = require('../controller/dashboard');

/* GET profile page. */
router.get('/getTokenData', function (req, res, next) {
    let status = common.validateToken(req.get('token'));
    console.log(status);
    if (status === true) {
        let response = dashboard.getDashboardData(req.get('token'));
        res.json(response);
    }
    else {
        res.status(401).json({
            status: false,
            reason: 'token is not valid',
            log: status
        });
    }

});

module.exports = router;
