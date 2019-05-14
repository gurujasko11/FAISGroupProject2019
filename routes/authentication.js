var express = require('express');
var router = express.Router();
var passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');
var indexModule = require('./index');
var getPageVariable = indexModule.getPageVariable;

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

module.exports = {
    router: router,
    authenticatedOnly: authenticatedOnly,
	authenticatedUserOnly: authenticatedUserOnly,
    notAuthenticatedOnly: notAuthenticatedOnly
};