var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Sample application using Node.js and Heroku Connect' });
});

module.exports = router;
