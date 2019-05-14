var express = require('express');
var router = express.Router();

// SELECT Mecze.id_meczu as id, Mecze.czas, dr1.nazwa_druzyny as team1, dr2.nazwa_druzyny as team2 FROM Mecze LEFT JOIN Druzyny dr1 ON dr1.id_druzyny = Mecze.id_druzyna1 LEFT JOIN Druzyny dr2 ON dr2.id_druzyny = Mecze.id_druzyna2;

router.get('/', function (req, res, next) {
        dbconn.query("SELECT Mecze.id_meczu as id, Mecze.czas, dr1.nazwa_druzyny as team1, dr2.nazwa_druzyny as team2 " +
            "FROM Mecze LEFT JOIN Druzyny dr1 ON dr1.id_druzyny = Mecze.id_druzyna1 " +
            "LEFT JOIN Druzyny dr2 ON dr2.id_druzyny = Mecze.id_druzyna2;", function (err, result) {
        let emptyArray = [];

        if(result === undefined) {
            res.render('match', {page: 'main', title: 'Lista rozgrywek', data: emptyArray});
        }
        res.render('match', {page: 'main', title: 'Lista rozgrywek', data: result});
    });
});

router.get('/add', function (req, res, next) {
    res.render('add_match', {page: 'main', title: 'Dodaj rozgrywkę'});

});

router.post('/add', function (req, res, next) {
    let team1_id, team2_id;
    dbconn.query("INSERT INTO Druzyny(nazwa_druzyny) VALUES ('" + req.body.team1 + "')", function (err, result) {
        team1_id = result.insertId;

        dbconn.query("INSERT INTO Druzyny(nazwa_druzyny) VALUES ('" + req.body.team2 + "')", function (err, result) {
            team2_id = result.insertId;
            let datetime = req.body.date + " " + req.body.time;
            let query = "INSERT INTO Mecze(id_druzyna1, id_druzyna2, czas) VALUES(" + team1_id + "," + team2_id + ",'" + datetime + "')";
            dbconn.query(query, function (err, result) {
                res.redirect("/");// ('match', {page: 'main', title: 'Lista rozgrywek'})
            });
        });
    });
});


//SELECT Mecze.id_meczu as id, Mecze.czas, dr1.nazwa_druzyny as team1, dr2.nazwa_druzyny as team2 FROM Mecze LEFT JOIN Druzyny dr1 ON dr1.id_druzyny = Mecze.id_druzyna1 LEFT JOIN Druzyny dr2 ON dr2.id_druzyny = Mecze.id_druzyna2 WHERE id_meczu = 1;

router.get('/edit/:id', function (req, res, next) {
    console.log(req.params.id);
    dbconn.query("SELECT Mecze.id_meczu as id, Mecze.czas, dr1.nazwa_druzyny as team1, dr2.nazwa_druzyny as team2 " +
        "FROM Mecze LEFT JOIN Druzyny dr1 ON dr1.id_druzyny = Mecze.id_druzyna1 " +
        "LEFT JOIN Druzyny dr2 ON dr2.id_druzyny = Mecze.id_druzyna2 WHERE id_meczu ="
        + req.params.id, function (err, result) {
        result[0].czas = result[0].czas + "";
        console.log(result[0].czas);
        res.render('edit_match', {page: 'main', title: 'Edycja rozgrywki', data: result[0]});
    });
});

router.post('/edit', function (req, res, next) {

    res.render('edit_match', {page: 'main', title: 'Edycja rozgrywki'});
});


router.get('/delete/:id', function (req, res, next) {
    console.log(req.params.id);
    dbconn.query("select * from Mecze where id_meczu="
        + req.params.id, function (err, result) {

        dbconn.query("SET FOREIGN_KEY_CHECKS=0;", function (err, res) {
        });

        dbconn.query("delete from Druzyny where id_druzyny="
            + result[0].id_druzyna1, function (err, res) {
            console.log(result[0].id_druzyna1);
        });
        dbconn.query("delete from Druzyny where id_druzyny="
            + result[0].id_druzyna2, function (err, res) {
            console.log(result[0].id_druzyna2);
        });
        dbconn.query("delete from Mecze where id_meczu="
            + req.params.id, function (err, res) {
        });
        dbconn.query("SET FOREIGN_KEY_CHECKS=1;", function (err, res) {
        });
        res.redirect('/match');
    });
});

module.exports = router;