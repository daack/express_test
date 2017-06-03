var express = require('express');
var router = express.Router();
var db = require('../db');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express'});
});

/* GET users listing. */
router.post('/', function(req, res, next) {
	db.query('SELECT * FROM users', function(err, rows, fields) {
		if (err) throw err;

		rows.forEach(function(row) {
			if(req.body.username == row.username && req.body.password == row.password) {
				console.log("ACCESSO CON: " + req.body.username);
				req.session.success = 'Accesso effettuato correttamente!';
				req.session.logged = req.body.username;
				res.status('200').render('index');
			} else {
				req.session.error = 'Utente non trovato. Riprova!';
				res.status('403').render('index');
			}
		}, this);
	});
});

module.exports = router;
