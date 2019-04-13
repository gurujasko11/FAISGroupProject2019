var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next)
{
    res.send('Got a GET request')
    // res.render('add_match');
});

router.post('/', function(req, res, next)
{
    // res.send('Got a POST request')
    res.render('add_match', { page: 'main', title: 'Dodaj rozgrywkę' });
});

module.exports = router;