var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res, next) {
  console.log('Ciao ' + req.body.user + '!')
});

module.exports = router;