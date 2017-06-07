var express = require('express')
  , router = express.Router()

// Car brands page
router.get('/spesa', function(req, res) {
  res.render('spesa', { title: 'Lista della spesa'});
})

// Car models page
router.get('/ricette', function(req, res) {
  res.render('ricette', { title: 'Ricette'});
})

module.exports = router