var express = require('express');
var passport = require('passport');
var router = express.Router();

var env = {
	AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
	AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
	AUTH0_CALLBACK_URL: process.env.AUTH0_CALLBACK_URL,
};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', env: env});
});

// We are also going to implement the callback route which will redirect the logged in user to the polls page if authentication succeeds.
router.get('/callback',
	passport.authenticate('auth0', { failureRedirect: '/' }),
	function(req, res) {
		res.redirect(req.session.returnTo || '/dashboard');
	}
);

module.exports = router;
