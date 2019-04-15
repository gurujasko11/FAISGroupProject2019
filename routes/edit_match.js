var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next)
{
    res.render('edit_match', { page: 'main', title: 'Edycja rozgrywki' });
});

router.post('/', function(req, res, next)
{

    // res.send('Got a POST request')
    res.render('edit_match', { page: 'main', title: 'Edycja rozgrywki' });
});

module.exports = router;