var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    dbconn.query("SELECT * from bary", function (err, result) {
        let emptyArray = [];
        if (result === undefined) {
            res.render('bars', {page: 'main', title: 'Lista barów', data: emptyArray});
        }
        res.render('bars', {page: 'main', title: 'Lista barów', data: result});
    });
});

router.get('/show_matches/:id', function (req, res, next) {
    let bar_id = req.params.id;
    dbconn.query("SELECT Mecze.id_meczu as id, Mecze.czas, dr1.nazwa_druzyny as team1, dr2.nazwa_druzyny as team2 FROM bary_z_meczami LEFT JOIN Mecze on Mecze.id_meczu = bary_z_meczami.id_meczu LEFT JOIN Druzyny dr1 ON dr1.id_druzyny = Mecze.id_druzyna1 LEFT JOIN Druzyny dr2 ON dr2.id_druzyny = Mecze.id_druzyna2 WHERE bary_z_meczami.id_baru = " + bar_id, function (err, result) {
        let emptyArray = [];
        console.log(result);
        if(result === undefined) {
            res.render('match', {page: 'main', title: 'Lista rozgrywek', data: emptyArray});
        }
        res.render('match', {page: 'main', title: 'Lista rozgrywek', data: result});
    });
});
module.exports = router;