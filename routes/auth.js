var express = require('express');
var router = express.Router();
var db = require('../db');

/* GET users listing. */
router.post('/', function(req, res, next) {
	db.query('SELECT * FROM users WHERE username = "' + req.body.username + '" AND password = "' + req.body.password + '"', function(err, rows, fields) {
		if (err) {
			throw err;
		}

		if(rows.length > 0) {
			req.session.success = 'Accesso effettuato correttamente!';
			req.session.logged = req.body.username;
			res.status('200');
			res.redirect('/');
		} else {
			req.session.error = 'Utente non trovato. Riprova!';
			res.status('403');
			res.redirect('/');
		}
	});
});

module.exports = router;