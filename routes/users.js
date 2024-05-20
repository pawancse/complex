var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function (req, res, next) {
  res.render('login', { message: 'User is not logged in' });
});

router.get('/signup', function (req, res, next) {
  res.render('signup', { message: 'User is not logged in' });
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/users/profile',
  failureRedirect: '/users/signup'
}));

module.exports = router;
