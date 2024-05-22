const express = require('express');
const auth = require('../controller/auth');
const common = require('../controller/common');
const router = express.Router();

/* GET users listing. */
router.post('/authenticate', function (req, res, next) {
  let loginId = req.body.username;
  let password = req.body.password;
  return auth.login(loginId, password).then(function (response) {
    if (response.status === true) {
      res.json(response);
    } else {
      res.status(500).json(response);
    }
  })
});

router.patch('/updatePassword', function (req, res, next) {
  let status = common.validateToken(req.get('token'));
  if (status === true) {
    let loginId = req.body.username;
    let oldPassword = req.body.oldPassword;
    let newPassword = req.body.newPassword;
    if (oldPassword === newPassword) {
      res.status(500).json({
        status: false,
        reason: 'Old and new passwords are same! There is nothing to update.'
      })
    }
    return auth.updatePassword(loginId, oldPassword, newPassword).then(function (response) {
      if (response.status === true) {
        res.json(response);
      } else {
        res.status(500).json(response);
      }
    })
  }
  else {
    res.status(401).json({
      status: false,
      reason: 'token is not valid',
      log: status
    });
  }
});

router.post('/createUser', function (req, res, next) {
  let status = common.validateToken(req.get('token'));
  if (status === true) {
    let loginId = req.body.username;
    let password = req.body.password;
    return auth.createUser(loginId, password).then(function (response) {
      if (response.status === true) {
        res.json(response);
      } else {
        res.status(500).json(response);
      }
    })
  }
  else {
    res.status(401).json({
      status: false,
      reason: 'token is not valid',
      log: status
    });
  }
});

router.delete('/removeUser', function (req, res, next) {
  let status = common.validateToken(req.get('token'));
  if (status === true) {
    let loginId = req.body.username;
    let password = req.body.password;
    return auth.removeUser(loginId, password).then(function (response) {
      if (response.status === true) {
        res.json(response);
      } else {
        res.status(500).json(response);
      }
    })
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
