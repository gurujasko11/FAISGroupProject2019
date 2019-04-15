var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next)
{
    res.send('Got a GET request')
    // res.render('add_match');
});

router.post('/', function(req, res, next)
{
    res.send(req.toString());

    if (req.action === 'Edytuj'){
        res.send('update')
    } else if (req.action === 'delete_button') {
        res.send('delete')
    } else {
        res.send('no button preseed')
    }


    // res.send('Got a POST request')
    res.render('edit_match', { page: 'main', title: 'Edycja rozgrywki' });
});

module.exports = router;