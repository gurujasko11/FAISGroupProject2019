var express = require('express');
var router = express.Router();
var indexModule = require('./index');
var getPageVariable = indexModule.getPageVariable;

router.get('/', function (req, res, next) {
    dbconn.query("SELECT * from Bary", function (err, result) {
        let emptyArray = [];
        if (result === undefined) {
            res.render('bars', {page: getPageVariable(req), title: 'Lista barów', data: emptyArray});
        }
        res.render('bars', {page: getPageVariable(req), title: 'Lista barów', data: result});
    });
});

router.get('/show_matches/:id', function (req, res, next) {
    let bar_id = req.params.id;
    dbconn.query("SELECT Mecze.id_meczu as id, Mecze.czas, dr1.nazwa_druzyny as team1, dr2.nazwa_druzyny as team2 FROM Bary_Z_Meczami LEFT JOIN Mecze on Mecze.id_meczu = Bary_Z_Meczami.id_meczu LEFT JOIN Druzyny dr1 ON dr1.id_druzyny = Mecze.id_druzyna1 LEFT JOIN Druzyny dr2 ON dr2.id_druzyny = Mecze.id_druzyna2 WHERE Bary_Z_Meczami.id_baru = " + bar_id, function (err, result) {
        let emptyArray = [];
        console.log(result);
        if(result === undefined) {
            res.render('match', {page: getPageVariable(req), title: 'Lista rozgrywek', data: emptyArray, addPossible: false});
        }
        res.render('match', {page: getPageVariable(req), title: 'Lista rozgrywek', data: result, addPossible: false});
    });
});
module.exports = router;