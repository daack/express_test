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
			if(req.body.user == row.username && req.body.password == row.password) {
				res.redirect(200, '/users');
			} else {
				res.render('index', { error: 'Utente inesistente.' })
			}
		}, this);
	});
});

module.exports = router;
