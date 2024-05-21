const express = require('express');
const auth = require('../controller/auth');
const router = express.Router();

/* GET users listing. */
router.post('/login', function (req, res, next) {
  let loginId = req.body.username;
  let password = req.body.password;
  return auth.login(loginId, password).then(function (response) {
    if (response.status === true) {
      res.render('dashboard.ejs', response);
    } else {
      res.render('/');
    }
  })
});

router.post('/tokenValidation', function (req, res, next) {
  let token = req.body.token;
  let decodedToken = auth.tokenValidation(token);
  if (decodedToken === null) {
    res.render('/');
  }
  else {
    res.json(decodedToken);
  }
});


module.exports = router;
