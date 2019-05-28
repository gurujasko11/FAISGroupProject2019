var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");
let nested_res;

// SELECT Mecze.id_meczu as id, Mecze.czas, dr1.nazwa_druzyny as team1, dr2.nazwa_druzyny as team2 FROM Mecze LEFT JOIN Druzyny dr1 ON dr1.id_druzyny = Mecze.id_druzyna1 LEFT JOIN Druzyny dr2 ON dr2.id_druzyny = Mecze.id_druzyna2;
// SELECT Mecze.id_meczu as id,Bary_Z_Meczami.id_baru,Bary.nazwa_baru, Mecze.czas, dr1.nazwa_druzyny as team1, dr2.nazwa_druzyny as team2 FROM Mecze LEFT JOIN Druzyny dr1 ON dr1.id_druzyny = Mecze.id_druzyna1 LEFT JOIN Druzyny dr2 ON dr2.id_druzyny = Mecze.id_druzyna2 left join Bary_Z_Meczami ON Bary_Z_Meczami.id_meczu=Mecze.id_meczu inner join Bary ON Bary.id_baru=Bary_Z_Meczami.id_baru;
router.get('/', function (req, res, next) {
    let query_match_teams_place = "" +
        //"SELECT Mecze.id_meczu as id,Bary_Z_Meczami.id_baru,Bary.nazwa_baru, Mecze.czas, dr1.nazwa_druzyny as team1, dr2.nazwa_druzyny as team2 FROM Mecze LEFT JOIN Druzyny dr1 ON dr1.id_druzyny = Mecze.id_druzyna1 LEFT JOIN Druzyny dr2 ON dr2.id_druzyny = Mecze.id_druzyna2 left join Bary_Z_Meczami ON Bary_Z_Meczami.id_meczu=Mecze.id_meczu inner join Bary ON Bary.id_baru=Bary_Z_Meczami.id_baru;"
        "SELECT Mecze.id_meczu as id, Mecze.czas, dr1.nazwa_druzyny as team1, dr2.nazwa_druzyny as team2 FROM Mecze LEFT JOIN Druzyny dr1 ON dr1.id_druzyny = Mecze.id_druzyna1 LEFT JOIN Druzyny dr2 ON dr2.id_druzyny = Mecze.id_druzyna2;";
    dbconn.query(query_match_teams_place, function (err, result) {
        let emptyArray = [];

        if(result === undefined) {
            res.render('match', {page: 'main', title: 'Lista rozgrywek', data: emptyArray, addPossible: req.isAuthenticated()});
        }

        res.render('match', {page: 'main', title: 'Lista rozgrywek', data: result, addPossible: req.isAuthenticated()});

    });
});

router.get('/add', function (req, res) {
        res.render('add_match', {page: 'main', title: 'Dodaj rozgrywkę'});
});

function send_email (target_email, datetime, place, team1_name, team2_name) {

    var link = "http://localhost:3000/match"; // todo need correct link like /match/id

    var mailOptions = {
        from: 'zespolowe.fais@gmail.com',
        to: target_email,
        subject: 'Mecz w twojej okolicy',
        html: 'Witaj!'
            + '<br> W twojej okolicy gra twoja ulubiona drużyna.'
            + '<br> <% team1_name %> + " : " + <% team2_name %> '
            + '<br> Lokal <% place %>'
            + '<br> Data <% datetime %>'
            + '<br> Kliknij poniższy link, by zobaczyć szczegóły:'
            + '<a href=' + link + '>' + link + '</a>'
            + '<br>Pozdrawiamy'
    }; //todo https://stackoverflow.com/questions/39489229/pass-variable-to-html-template-in-nodemailer

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}


function prepare_email(team_id, user_id, datetime, place, team1_name, team2_name) {
    dbconn.query("SELECT email FROM Uzytkownicy WHERE id_uzytkownika=" + user_id, function (err, result) {
        if(result !== undefined) {
            let email = result[0].email;
            send_email(email, datetime, place, team1_name, team2_name);
        }
    });
}

function notify_users_about_match(team1_id, team2_id, datetime, place, team1_name, team2_name){
    dbconn.query("SELECT * FROM Uzytkownik_Z_Druzynami", function (err, result) {
        for(var i = 0, size = result.length; i < size ; i++){

            let user_id = result[i].id_uzytkownika;
            let team_id = result[i].id_druzyny;
            if(team_id === team1_id || team_id === team2_id){
                prepare_email(team_id, user_id, datetime, place, team1_name, team2_name);
            }
        }
    });
}


function nested_add2(req, team1_id, team2_id, team1_name, team2_name, id_baru, id_meczu, place, datetime){
    let add_match_query = "INSERT INTO Mecze(id_druzyna1, id_druzyna2, czas) VALUES(" + team1_id + "," + team2_id + ",'" + datetime + "')";
    dbconn.query(add_match_query, function (err, result) {
        if(err){
            console.log(err);
        }

        id_meczu = result.insertId;
        dbconn.query("SET FOREIGN_KEY_CHECKS=0;", function (req, res) {
            let insert_to_bary_z_meczami = "INSERT INTO Bary_Z_Meczami(id_baru, id_meczu, czas) VALUES(" + id_baru + ", " + id_meczu + ", '" + datetime + "')";
            dbconn.query(insert_to_bary_z_meczami, function (err, res) {
                dbconn.query("SET FOREIGN_KEY_CHECKS=1;", function (req, res) {
                    notify_users_about_match(team1_id, team2_id, datetime, place, team1_name, team2_name);
                    nested_res.redirect("/");
                });
            });
        });
    });
}


function nested_add(req, team1_id, team1_name, team2_name, id_baru, id_meczu, place, datetime){
    let team2_id;

    dbconn.query("INSERT INTO Druzyny(nazwa_druzyny) VALUES ('" + team2_name + "')",  function (err, result) {
        if (err) {
            dbconn.query("SELECT * FROM Druzyny WHERE nazwa_druzyny='" + team2_name + "'",  function (err, res) {
                team2_id = res[0].id_druzyny;
                nested_add2(req, team1_id, team2_id, team1_name, team2_name, id_baru, id_meczu, place, datetime)
            });
        } else {
            team2_id = result.insertId;
            nested_add2(req, team1_id, team2_id, team1_name, team2_name, id_baru, id_meczu, place, datetime)
        }
    });
}


router.post('/add', function (req, res) {
    nested_res = res;
    let team1_id, team2_id, id_baru, id_meczu, place;
    let datetime = req.body.date + " " + req.body.time;
    let bar_owner_id = "1235";
    // let bar_owner_id = req.user.userID;
    let team1_name = req.body.team1;
    let team2_name = req.body.team2;

    let bar_name_query = "select Bary.nazwa_baru, Bary.id_baru from Wlasciciel_Z_Barami left join Bary ON Wlasciciel_Z_Barami.id_baru=Bary.id_baru where Wlasciciel_Z_Barami.id_uzytkownika=" + bar_owner_id;
    dbconn.query(bar_name_query,  function (err, res) {

        place = res[0].nazwa_baru;
        id_baru = res[0].id_baru;
        let first_insert = "INSERT INTO Druzyny(nazwa_druzyny) VALUES ('" + team1_name + "')";
        dbconn.query(first_insert,   function (err, result) {
            if (err) {
                dbconn.query("SELECT * FROM Druzyny WHERE nazwa_druzyny='" + team1_name + "'",   function (err, res) {
                    team1_id = res[0].id_druzyny;
                    nested_add(req, team1_id, team1_name, team2_name, id_baru, id_meczu, place, datetime);
                });
            } else {
                team1_id = result.insertId;
                nested_add(req, team1_id, team1_name, team2_name, id_baru, id_meczu, place, datetime);
            }
        });
    });
});


router.get('/edit', function (req, res, next) {
    console.log(req.body.id);
    dbconn.query("SELECT Mecze.id_meczu as id, Mecze.czas, dr1.nazwa_druzyny as team1, dr2.nazwa_druzyny as team2 " +
        "FROM Mecze LEFT JOIN Druzyny dr1 ON dr1.id_druzyny = Mecze.id_druzyna1 " +
        "LEFT JOIN Druzyny dr2 ON dr2.id_druzyny = Mecze.id_druzyna2 WHERE id_meczu ="
        + req.params.id, function (err, result) {
        result[0].czas = result[0].czas + "";
        console.log(result[0].czas);
        res.render('edit_match', {page: 'main', title: 'Edycja rozgrywki', data: result[0]});
    });
});


router.get('/edit/:id', function (req, res, next) {
    console.log(req.params.id);
    dbconn.query("SELECT Mecze.id_meczu as id, Mecze.czas, dr1.nazwa_druzyny as team1, dr2.nazwa_druzyny as team2 FROM Mecze LEFT JOIN Druzyny dr1 ON dr1.id_druzyny = Mecze.id_druzyna1 LEFT JOIN Druzyny dr2 ON dr2.id_druzyny = Mecze.id_druzyna2 WHERE id_meczu =" + req.params.id, function (err, result) {
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

        dbconn.query("SET FOREIGN_KEY_CHECKS=0;", function (err, res) {});

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
        dbconn.query("SET FOREIGN_KEY_CHECKS=1;", function (err, res) {});
        res.redirect('/match');
    });
});

router.get('/add/:id/:bar', function (req, res, next) {
    let query = "INSERT INTO Bary_Z_Meczami(id_meczu, id_baru) VALUES(" + req.params.id + ", " + req.params.bar + ");";
    dbconn.query(query, function (err, result) {
        res.redirect("/bars/show_matches/" + req.params.bar);
    });
});

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'zespolowe.fais@gmail.com',
        pass: 'alama100$'
    }
});


module.exports = router;