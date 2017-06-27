var express = require('express');
var passport = require('passport');
var request = require('request');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('dashboard', { title: 'Dashboard'});
});

module.exports = router;