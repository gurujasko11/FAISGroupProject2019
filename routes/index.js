var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { page: 'index', title: 'Express' });
});

router.get('/exp1', function(req, res, next) {
  res.render('index', { page: 'index', title: 'Express1' });
});

module.exports = router;
