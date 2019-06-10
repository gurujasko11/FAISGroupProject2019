var express = require('express');
var router = express.Router();
var indexModule = require('./index');
var getPageVariable = indexModule.getPageVariable;
const nodemailer = require("nodemailer");
var handlebars = require('handlebars');

let nested_add_res;
let nested_edit_res;

router.get('/', function (req, res) {
    let query_match_teams_place = "" +
        "SELECT Bary_Z_Meczami.id_meczu as id, Bary_Z_Meczami.czas, dr1.nazwa_druzyny as team1, dr2.nazwa_druzyny as team2 FROM Bary_Z_Meczami LEFT JOIN Mecze ON Mecze.id_meczu = Bary_Z_Meczami.id_meczu LEFT JOIN Druzyny dr1 ON dr1.id_druzyny = Mecze.id_druzyna1 LEFT JOIN Druzyny dr2 ON dr2.id_druzyny = Mecze.id_druzyna2 WHERE id_druzyna1 != '' and id_druzyna2 != '';"
    dbconn.query(query_match_teams_place, function (err, result) {
        let emptyArray = [];
        let is_bar = false;
        try {
            if (req.user.barID !== undefined)
                is_bar = true;
        } catch (e) {
            console.log("No Bar");
        }

        if (result === undefined) {
            res.render('match', {
                page: getPageVariable(req),
                title: 'Lista rozgrywek',
                data: emptyArray,
                addPossible: req.isAuthenticated(),
                is_bar: is_bar
            });
        }

        res.render('match', {
            page: getPageVariable(req),
            title: 'Lista rozgrywek',
            data: result,
            addPossible: req.isAuthenticated(),
            is_bar: is_bar
        });

    });
});

router.get('/add', function (req, res) {
    let select_teams = "SELECT * FROM Druzyny";
    dbconn.query(select_teams, function (err, result) {
        res.render('add_match', {page: getPageVariable(req), title: 'Dodaj rozgrywkę', teams: result});
    });
});


function send_email(target_email, datetime, place, team1_name, team2_name) {

    var link = "http://localhost:3000/match";

    var raw_html = 'Witaj!'
        + '<br> W twojej okolicy gra twoja ulubiona drużyna.'
        + '<br> Mecz: {{team1_name }} : {{team2_name }} '
        + '<br> Lokal: {{place }}'
        + '<br> Data {{datetime}} '
        + '<br> Kliknij poniższy link, by zobaczyć szczegóły:'
        + '<a href=' + link + '>' + link + '</a>'
        + '<br>Pozdrawiamy'


    var template = handlebars.compile(raw_html);
    var replacements = {
        team1_name: team1_name,
        team2_name: team2_name,
        place: place,
        datetime: datetime
    };
    var htmlToSend = template(replacements);

    var ready_html = {
        from: 'zespolowe.fais@gmail.com',
        to: target_email,
        subject: 'Mecz w twojej okolicy',
        html: htmlToSend
    };

    transporter.sendMail(ready_html, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}


function prepare_email(team_id, user_id, datetime, place, team1_name, team2_name) {
    dbconn.query("SELECT email FROM Uzytkownicy WHERE id_uzytkownika=" + user_id, function (err, result) {
        if (result !== undefined) {
            let email = result[0].email;
            send_email(email, datetime, place, team1_name, team2_name);
        }
    });
}

function notify_users_about_match(bar_id, match_id, datetime){
    let team1_id, team2_id, place;
    dbconn.query("select * from Mecze where id_meczu=" + match_id, function (err, result) {
        team1_id = result[0].id_druzyna1;
        team2_id = result[0].id_druzyna2;
        dbconn.query("select * from Druzyny where id_druzyny=" + team1_id, function (err, result) {
            team1_name = result[0].nazwa_druzyny;
            dbconn.query("select * from Druzyny where id_druzyny=" + team2_id, function (err, result) {
                team2_name = result[0].nazwa_druzyny;
                dbconn.query("select nazwa_baru, id_baru from Bary where id_baru=" + bar_id, function (err, result){
                    place = result[0].nazwa_baru;

                    dbconn.query("SELECT * FROM Uzytkownik_Z_Druzynami", function (err, result) {
                        for (var i = 0, size = result.length; i < size; i++) {

                            let user_id = result[i].id_uzytkownika;
                            let team_id = result[i].id_druzyny;
                            if (team_id === team1_id || team_id === team2_id) {
                                prepare_email(team_id, user_id, datetime, place, team1_name, team2_name);
                            }
                        }
                    });
                });
            });
        });
    });
}


function nested_add2(req, team1_id, team2_id, team1_name, team2_name, id_baru, id_meczu, place, datetime) {
    let add_match_query = "INSERT INTO Mecze(id_druzyna1, id_druzyna2, czas) VALUES(" + team1_id + "," + team2_id + ",'" + datetime + "')";
    dbconn.query(add_match_query, function (err, result) {
        if (err) {
            console.log(err);
        }
        nested_add_res.redirect('/match')
        id_meczu = result.insertId;
    });
}

function nested_add(req, team1_id, team1_name, team2_name, id_baru, id_meczu, place, datetime) {
    let team2_id;
    dbconn.query("SELECT * FROM Druzyny WHERE nazwa_druzyny='" + team2_name + "'", function (err, res) {
        team2_id = res[0].id_druzyny;
        nested_add2(req, team1_id, team2_id, team1_name, team2_name, id_baru, id_meczu, place, datetime)
    });
}


router.post('/add', function (req, res) {
    nested_add_res = res;
    let team1_id, id_baru, id_meczu, place;
    let datetime = req.body.date + " " + req.body.time;
    let bar_owner_id = req.user.barID;
    let team1_name = req.body.team1;
    let team2_name = req.body.team2;

    let bar_name_query = "select nazwa_baru, id_baru from Bary where id_baru=" + bar_owner_id;
    dbconn.query(bar_name_query, function (err, res) {

        place = res[0].nazwa_baru;
        id_baru = res[0].id_baru;

        dbconn.query("SELECT * FROM Druzyny WHERE nazwa_druzyny='" + team1_name + "'", function (err, res) {
            team1_id = res[0].id_druzyny;
            nested_add(req, team1_id, team1_name, team2_name, id_baru, id_meczu, place, datetime);
        });

    });
});


router.get('/edit/:id', function (req, res, next) {
    let match_id = req.params.id;

    let select_teams = "SELECT * FROM Druzyny";

    dbconn.query("SELECT Mecze.id_meczu as id, Mecze.czas, dr1.nazwa_druzyny as team1, dr2.nazwa_druzyny as team2 FROM Mecze LEFT JOIN Druzyny dr1 ON dr1.id_druzyny = Mecze.id_druzyna1 LEFT JOIN Druzyny dr2 ON dr2.id_druzyny = Mecze.id_druzyna2 WHERE id_meczu =" + match_id, function (err, result) {
        result[0].czas = result[0].czas + "";
        console.log(result[0].czas);
        dbconn.query(select_teams, function (err, team_res) {
            res.render('edit_match', {
                page: getPageVariable(req),
                title: 'Edycja rozgrywki', data: result[0], teams: team_res, match_id: match_id
            });
        });
    });
});


router.post('/edit', function (req, res, next) {
    nested_edit_res = res;
    let new_team1_id, new_team2_id, place;
    let datetime = req.body.date + " " + req.body.time;
    let bar_id = req.user.barID;
    let team1_name = req.body.team1;
    let team2_name = req.body.team2;
    let match_id = req.body.edited_match_id;

    let bar_name_query = "select * from Bary where id_baru=" + bar_id;
    dbconn.query(bar_name_query, function (err, res) {

        place = res[0].nazwa_baru;

        let team1_query = "select * from Druzyny where nazwa_druzyny='" + team1_name + "';";

        dbconn.query(team1_query, function (err, result) {
            new_team1_id = result[0].id_druzyny;
            let team2_query = "select * from Druzyny where nazwa_druzyny='" + team2_name + "';";

            dbconn.query(team2_query, function (err, result) {
                new_team2_id = result[0].id_druzyny;
                let update_to_bary_z_meczami = "UPDATE Bary_Z_Meczami SET czas='" + datetime + "' WHERE id_meczu=" + match_id + ";";
                dbconn.query(update_to_bary_z_meczami, function (err, res) {

                    let update_match = "UPDATE Mecze SET czas='" + datetime + "', id_druzyna1=" + new_team1_id + ", id_druzyna2=" + new_team2_id + " WHERE id_meczu=" + match_id + ";";
                    dbconn.query(update_match, function (err, res) {
                        nested_edit_res.redirect('/match');
                    });
                });
            });
        });
    });
});


router.get('/delete/:id', function (req, result, next) {
    console.log(req.params.id);
    dbconn.query("delete from Bary_Z_Meczami where id_meczu="
        + req.params.id, function (err, res) {
        result.redirect('/match');
    });
});

router.get('/add/:id/:bar', function (req, res, next) {
    let query = "INSERT INTO Bary_Z_Meczami(id_meczu, id_baru) VALUES(" + req.params.id + ", " + req.params.bar + ");";
    dbconn.query(query, function (err, result) {
        res.redirect("/bars/show_matches/" + req.params.bar);
    });
});

router.get('/add/bar_match', function (req, res, next) {

    dbconn.query("SELECT Mecze.czas as czas, Mecze.id_meczu as id, dr1.nazwa_druzyny as team1, dr2.nazwa_druzyny as team2 FROM Mecze LEFT JOIN Druzyny dr1 ON dr1.id_druzyny = Mecze.id_druzyna1 LEFT JOIN Druzyny dr2 ON dr2.id_druzyny = Mecze.id_druzyna2 WHERE DATE(czas) > CURDATE()", function (err, result) {
        for(var i = 0; i < result.length; i++){
            result[i].czas = (result[i].czas+"").split("GMT")[0];
        }
        res.render('add_bar_match', {
            page: getPageVariable(req),
            title: 'Dodawanie rozgrywek do baru', data: result
        });
    });
});

router.post('/add/bar_match', function (req, res, next) {
    let match_id = req.body.match;
    let bar_id = req.user.barID;
    let datetime = req.body.date + " " + req.body.time;
    let query = "INSERT INTO Bary_Z_Meczami(id_baru, id_meczu, czas) VALUES(" + bar_id + ", " + match_id + ", '" + datetime + "')";
    dbconn.query(query, function (err, result) {
        notify_users_about_match(bar_id, match_id, datetime);
        res.redirect('/match');
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