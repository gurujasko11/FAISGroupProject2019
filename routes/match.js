var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");

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

router.get('/add', function (req, res, next) {
    dbconn.query("SELECT * from Bary", function (err, result) {
        res.render('add_match', {page: 'main', title: 'Dodaj rozgrywkę', data: result});
    });
});


function sendE(team_id, user_id) {
    console.log("likes:");
    console.log(team_id);
    console.log(user_id);
    dbconn.query("SELECT email FROM Uzytkownicy WHERE id_uzytkownika=" + user_id, function (err, result) {
        if(result !== undefined) {
            console.log(result);
            let email = result[0].email;
            console.log(email);
            send_email(email);
        }
    });
}

function notify_users_about_match(team1_id, team2_id, datetime){
    dbconn.query("SELECT * FROM Uzytkownik_Z_Druzynami", function (err, result) {
        for(var i = 0, size = result.length; i < size ; i++){

            let user_id = result[i].id_uzytkownika;
            let team_id = result[i].id_druzyny;
            if(team_id === team1_id || team_id === team2_id){
                sendE(team_id, user_id, datetime);
            }
        }
    });
}

router.post('/add', function (req, res, next) {
    let team1_id, team2_id, id_baru, id_meczu;
    let place = req.body.place;

    //todo if in database
    dbconn.query("SET FOREIGN_KEY_CHECKS=0;", function (err, res) {});
    dbconn.query("INSERT INTO Druzyny(nazwa_druzyny) VALUES ('" + req.body.team1 + "')", function (err, result) {
        team1_id = result.insertId;

        dbconn.query("INSERT INTO Druzyny(nazwa_druzyny) VALUES ('" + req.body.team2 + "')", function (err, result) {
            team2_id = result.insertId;
            let datetime = req.body.date + " " + req.body.time;
            let add_match_query = "INSERT INTO Mecze(id_druzyna1, id_druzyna2, czas) VALUES(" + team1_id + "," + team2_id + ",'" + datetime + "')";



            // console.log(add_match_query);
            // console.log(insert_to_bary_z_meczami);
            //
            // dbconn.query(insert_to_bary_z_meczami, function (err, res) {});

            dbconn.query(add_match_query, function (err, result) {
                id_meczu = result.insertId;
                console.log("place");
                console.log(place);
                let get_bar_id_query = "select id_baru, nazwa_baru from Bary where nazwa_baru=" + place;
                dbconn.query(get_bar_id_query, function (err, result) {
                    id_baru = result.id_baru;
                    let insert_to_bary_z_meczami = "INSERT INTO Bary_Z_Meczami(id_baru, id_meczu, czas) VALUES(" + id_baru + ", " + id_meczu + ", " + datetime + "')";

                    dbconn.query(insert_to_bary_z_meczami, function (err, result) {
                        notify_users_about_match(team1_id, team2_id, datetime);
                        dbconn.query("SET FOREIGN_KEY_CHECKS=1;", function (err, res) {});
                        res.redirect("/");
                    });

                });
            });
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




function send_email (target_email) {

    var link = "http://localhost:3000/match"; // todo need correct link

    var mailOptions = {
        from: 'zespolowe.fais@gmail.com',
        to: target_email,
        subject: 'Mecz w twojej okolicy',
        html: 'Witaj! <br>'
            + 'W towjej okolicy gra twoja ulubiona drużyna. Kliknij poniższy link, by zobaczyć szczegóły:<br>'
            + '<a href=' + link + '>' + link + '</a>'
            + '<br>Bests, <br>Project team'
    };


    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

}


router.get( '/send', function(req, res){
    notify_users_about_match(20, 19, "12:00");
    res.redirect("/");
});

module.exports = router;