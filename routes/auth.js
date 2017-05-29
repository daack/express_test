var express = require('express');
var router = express.Router();
var db = require('../db');

/* GET users listing. */
router.post('/', function(req, res, next) {

  db.query('SELECT * FROM users', function(err, rows, fields) {
    if (err) throw err;
    rows.forEach(function(row) {
      if(req.body.user == row.username && req.body.password == row.password) {
        console.log('The solution is: ', rows);
      }
    }, this);
    
  });
});

module.exports = router;