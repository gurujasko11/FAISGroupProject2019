var express = require('express');
var router = express.Router();
var passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');
var indexModule = require('./index');
var getPageVariable = indexModule.getPageVariable;
var randtoken = require('rand-token');
var uid = require('rand-token').uid;
const nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'Nodemailerzespolowe@gmail.com',
      pass: 'Nodemailer11!!rafal'
    }
  });


passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    function (req, username, password, done) {
        username = req.body.email.replace("'", "''");
        password = req.body.password.replace("'", "''");
        tableName = getTableNameFrom(req.body.user.replace("'", "''"));
        if (!username || !password) {
            console.log("username/password not given: ");
            console.log(username);
            console.log(password);
            return done(null, false);
        }
        dbconn.query("select * from " + tableName + " where email = '" + username + "'", function (err, rows) {
            if (err) return done(null, false, req.flash('FLASH_MSG', ['SQL ERROR', err]));
            if (!rows.length) {
                return done(null, false, req.flash('FLASH_MSG', ['ERROR', 'Użytkownik z takim e-mailem nie istnieje']));
            }
            if(rows[0].status != 'activated'){ return done(null, false, req.flash('FLASH_MSG', ['ERROR', 'Użytkownik nie potwierdził konta linkiem aktywacyjnym'])); }

            var encPassword = password;
            var dbPassword = rows[0].haslo;
            bcrypt.compare(encPassword, dbPassword, function (err, res) {
                if (res) {
                    if (tableName == 'Uzytkownicy')
                        return done(null, {
                            userID: rows[0].id_uzytkownika,
                            first_name: rows[0].imie,
                            last_name: rows[0].nazwisko,
                            email: rows[0].email,
                            telephone: rows[0].telefon,
                            type: req.body.user
                        });
                    else if (tableName == 'Bary')
                        return done(null, {
                            barID: rows[0].id_baru,
                            bar_name: rows[0].nazwa_baru,
                            telephone: rows[0].telefon,
                            town: rows[0].miasto,
                            street: rows[0].ulica,
                            building_number: rows[0].numer_budynku,
                            local_number: rows[0].numer_lokalu,
                            type: req.body.user
                        });
                    else
                        return done(null, rows[0]);
                } else {
                    return done(null, false, req.flash('FLASH_MSG', ['ERROR', 'Niepoprawne hasło']));
                }
            });
        });
    }
));

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});


router.get('/login', function (req, res, next) {
    if (req.isAuthenticated()) {
        req.flash('FLASH_MSG', ['INFO', 'Jesteś już zalogowany']);
        res.redirect('/');
    } else
        res.render('login', {
            page: getPageVariable(req),
            title: 'Logowanie',
            flash_messages: req.flash('FLASH_MSG')
        });
});

router.post('/login',
    passport.authenticate('local', {
        failureRedirect: '/login',
        failureFlash: true
    }),
    function (req, res, next) {
        req.flash('FLASH_MSG', ['SUCCESS', 'Zalogowano pomyślnie']);
        res.redirect('/');
    });

router.get('/logout', function (req, res) {
    if (!req.isAuthenticated()) {
        req.flash("FLASH_MSG", ['INFO', 'Nie można wylogować osoby, która nie jest zalogowana']);
        res.redirect('/login');
    } else {
        req.logout();
        req.flash('FLASH_MSG', ['SUCCESS', 'Wylogowano pomyślnie']);
        res.redirect('/');
    }
});

function getTableNameFrom(user) //returns table name
{
    if (user == 'user')
        return 'Uzytkownicy';
    else
        return 'Bary';
}

function authenticatedOnly(req, res, next) {
    if (!req.isAuthenticated()) {
        req.flash('FLASH_MSG', ['ERROR', 'Dostęp do tego panelu jest możliwy tylko po zalogowaniu']);
        return res.redirect('/login');
    }
    next();
}

function authenticatedUserOnly(req, res, next) {
    if (!req.isAuthenticated()) {
        req.flash('FLASH_MSG', ['ERROR', 'Dostęp do tego panelu jest możliwy tylko po zalogowaniu']);
        return res.redirect('/login');
    }
	if(req.user.type != 'user') {
		req.flash('FLASH_MSG', ['ERROR', 'Przepaszamy, tylko użytkownik ma dostęp do tego panelu']);
        return res.redirect('/');
	}
    next();
}

function notAuthenticatedOnly(req, res, next) {
    if (req.isAuthenticated()) {
        req.flash('FLASH_MSG', ['INFO', 'Jesteś już zalogowany']);
        return res.redirect('/');
    }
    next();
}


router.get('/activate/:token', function(req, res, next){

    var query = "select * from Uzytkownicy where status = '"+ req.params.token+ "'";
    console.log('query: ',query)
    console.log('token: ', req.params.token)
    dbconn.query(query, function (err, rows) {

      if (err) {
        console.log('Mysql error while activation', err);
        req.flash("FLASH_MSG", ['ERROR', 'Mysql error']);
      }
      else if(!rows.length){
        console.log('No users with this token');
        req.flash("FLASH_MSG", ['ERROR', 'Mysql error']);
       }
      else {
        dbconn.query("update Uzytkownicy set status='activated' where status = '" +req.params.token+"'", function (err, rows) {
          if (err) {
            console.log('Mysql error while setting activated status', err);
            req.flash("FLASH_MSG", ['ERROR', 'Mysql activation user error']);
          }
          res.render('register_user', { page: getPageVariable(req), title: "Rejestracja użytkownika", type: 'SUCCESS', msg: 'Pomyślnie zaktywowano konto.', flash_messages: req.flash("FLASH_MSG") });

        });
      }

    });

});


router.get('/activateBar/:token', function(req, res, next){

    var query = "select * from Bary where status = '"+ req.params.token+ "'";
    console.log('query: ',query)
    console.log('token: ', req.params.token)
    dbconn.query(query, function (err, rows) {

      if (err) {
        console.log('Mysql error while activation', err);
        req.flash("FLASH_MSG", ['ERROR', 'Mysql error']);
      }
      else if(!rows.length){
        console.log('No bars with this token');
        req.flash("FLASH_MSG", ['ERROR', 'Mysql error']);
       }
      else {
        dbconn.query("update Bary set status='activated' where status = '" +req.params.token+"'", function (err, rows) {
          if (err) {
            console.log('Mysql error while setting activated status', err);
            req.flash("FLASH_MSG", ['ERROR', 'Mysql activation user error']);
          }
          res.render('register_bar', { page: getPageVariable(req), title: "Rejestracja bary", type: 'SUCCESS', msg: 'Pomyślnie zaktywowano konto.', flash_messages: req.flash("FLASH_MSG") });

        });
      }

    });

});


module.exports = {
    router: router,
    authenticatedOnly: authenticatedOnly,
	authenticatedUserOnly: authenticatedUserOnly,
    notAuthenticatedOnly: notAuthenticatedOnly
};