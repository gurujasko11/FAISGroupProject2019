var express = require('express');
var router = express.Router();
var passport = require('passport');

// SELECT Mecze.id_meczu as id, Mecze.czas, dr1.nazwa_druzyny as team1, dr2.nazwa_druzyny as team2 FROM Mecze LEFT JOIN Druzyny dr1 ON dr1.id_druzyny = Mecze.id_druzyna1 LEFT JOIN Druzyny dr2 ON dr2.id_druzyny = Mecze.id_druzyna2;

router.get('/', function (req, res, next) {
    dbconn.query("SELECT Mecze.id_meczu as id, Mecze.czas, dr1.nazwa_druzyny as team1, dr2.nazwa_druzyny as team2 FROM Mecze LEFT JOIN Druzyny dr1 ON dr1.id_druzyny = Mecze.id_druzyna1 LEFT JOIN Druzyny dr2 ON dr2.id_druzyny = Mecze.id_druzyna2;", function (err, result) {
        let emptyArray = [];

        if (result === undefined) {
            res.render('match', {page: 'main', title: 'Lista rozgrywek', data: emptyArray, addPossible: true});
        }
        res.render('match', {page: 'main', title: 'Lista rozgrywek', data: result, addPossible: true});
    });
});

router.get('/add', function (req, res, next) {
    dbconn.query("SELECT * from bary", function (err, result) {
        res.render('add_match', {page: 'main', title: 'Dodaj rozgrywkę', data: result});
    });
});

router.post('/add', function (req, res, next) {
    let team1_id, team2_id;
    dbconn.query("INSERT INTO Druzyny(nazwa_druzyny) VALUES ('" + req.body.team1 + "')", function (err, result) {
        team1_id = result.insertId;
        console.log(req.body.place);
        dbconn.query("INSERT INTO Druzyny(nazwa_druzyny) VALUES ('" + req.body.team2 + "')", function (err, result) {
            team2_id = result.insertId;
            let datetime = req.body.date + " " + req.body.time;
            let query = "INSERT INTO Mecze(id_druzyna1, id_druzyna2, czas) VALUES(" + team1_id + "," + team2_id + ",'" + datetime + "')";
            dbconn.query(query, function (err, result) {
                let query = "INSERT INTO bary_z_meczami(id_meczu, id_baru) VALUES(" + result.insertId + ", " + req.body.place + ");";
                dbconn.query(query, function (err, result) {
                    res.redirect("/");
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

router.get('/add/:id/:bar', function (req, res, next) {
    let query = "INSERT INTO bary_z_meczami(id_meczu, id_baru) VALUES(" + req.params.id + ", " + req.params.bar + ");";
    dbconn.query(query, function (err, result) {
        res.redirect("/bars/show_matches/" + req.params.bar);
    });
});


const nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'zespolowe.fais@gmail.com',
        pass: 'alama100$'
    }
});


// passport.use(new LocalStrategy({
//         usernameField: 'email',
//         passwordField: 'password',
//         passReqToCallback : true
//     },
//     function(req, username, password, done) {
//         username = req.body.email.replace("'", "''");
//         password = req.body.password.replace("'", "''");
//         tableName = getTableNameFrom(req.body.user.replace("'", "''"));
//         // if(!username || !password ) { console.log("username/password not given: "); console.log(username); console.log(password); return done(null, false); }
//         dbconn.query("select * from " + tableName + " where email = '"+ username+"'", function(err, rows) {
//             if (err) return done(null, false, req.flash('FLASH_MSG', ['SQL ERROR', err]));
//             if(!rows.length){ return done(null, false, req.flash('FLASH_MSG', ['ERROR', 'Użytkownik z takim e-mailem nie istnieje'])); }
//
//
//             var encPassword = password;
//             var dbPassword  = rows[0].haslo;
//             bcrypt.compare(encPassword, dbPassword, function(err, res) {
//                 if(res) {
//                     if(tableName == 'Uzytkownicy')
//                         return done(null, { userID: rows[0].id_uzytkownika, first_name: rows[0].imie, last_name: rows[0].nazwisko, email: rows[0].email, type: req.body.user });
//                     else if(tableName == 'Bary')
//                         return done(null, { barID: rows[0].id_baru, bar_name: rows[0].nazwa_baru, telephone: rows[0].telefon, town: rows[0].miasto,
//                             street: rows[0].ulica, building_number: rows[0].numer_budynku, local_number: rows[0].numer_lokalu, type: req.body.user });
//                     else
//                         return done(null, rows[0]);
//                 } else {
//                     return done(null, false, req.flash('FLASH_MSG', ['ERROR', 'Niepoprawne hasło']));
//                 }
//             });
//         });
//     }
// ));

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});




router.get('/send', function (req, res) {
    let table = "Uzytkownicy";
    // if (req.param("isBar", 0) == 1) {
        table = "Bary";
    // }


    var mailOptions = {
        from: 'zespolowe.fais@gmail.com',
        to: "kamil.sladowski@gmail.com",
        subject: 'Twoja drużyna gra w twojej okolicy',
        html: 'Hello <br>'
            + 'To reset your password to "password" click link below:<br>'
            + '<br>Bests, <br>Project team'
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            req.flash("FLASH_MSG", ['ERROR', 'Błąd serwera, ponów próbę - nie udało się wysłac maila o nadchodzącym meczu']);
            console.log(error);
            res.redirect("/");
        } else {
            console.log('Email sent: ' + info.response);
            req.flash("FLASH_MSG", ['SUCCESS', 'Wysłano mail o zblizajacym sie meczu']);
            res.redirect("/");
        }
    });
});



// var emailjs = require("emailjs");

// function sendEmail () {
//
//     var service_id = 'gmail';
//     var template_id = "template_JGGDCknV";
//
//     var template_params = {
//         name: 'Kamil',
//         reply_email: 'kamilo116@o2.pl',
//         message: 'This is awesome!'
//     };
//
//
//     var email   = require("emailjs");
//     var server  = email.server.connect({
//         // user: "Kamil",
//         user: "kamil.sladowski@gmail.com",
//         // user:    process.env.GMAIL_USER,
//         // password: "179021abb1d89d87dafc0ff7a40030e3",
//         password: "179021abb1d89d87dafc0ff7a40030e3",
//         user_id: "user_HHBrB5FSE3MUVMasNUB3t",
//         host: "smtp.gmail.com",
//         ssl:     true
//     });
//
//     server.send({
//         text:    "example",
//         from:    "kamil.sladowski@gmail.com",
//         to:      "kamilo116@o2.pl",
//         subject: "match",
//
//     }, function(err, message) { console.log(err || message); });
//
//
//     // emailjs.init("user_HHBrB5FSE3MUVMasNUB3t");
//     // var email 	= require("./path/to/emailjs/email");
//     // var server 	= email.server.connect({
//     //     user:	"username",
//     //     password:"password",
//     //     host:	"smtp.your-email.com",
//     //     ssl:		true
//     // });
//
//
//
//
//     //
//     // emailjs.send(service_id, template_id, template_params)
//     //     .then(function(response) {
//     //         console.log('SUCCESS!', response.status, response.text);
//     //     }, function(error) {
//     //         console.log('FAILED...', error);
//     //     });
//
// }


// router.get( '/send', function(req, res){
//
//
//
//     sendEmail ();
//
// });

module.exports = router;