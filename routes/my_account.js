var express = require('express');
var router = express.Router();
var indexModule = require('./index');
var registrationModule = require('./registration');
var authenticationModule = require('./authentication');
const bcrypt = require('bcrypt');
var printUserData = indexModule.printUserData;
var getPageVariable = indexModule.getPageVariable;
var isEmailAvailable = registrationModule.isEmailAvailable;
var authenticatedUsersBarsOnly = authenticationModule.authenticatedUsersBarsOnly;


router.get('/my_account', authenticatedUsersBarsOnly, function (req, res) {
    if (req.user.type == 'user')
        return res.redirect('/my_user_account');
    req.flash('FLASH_MSG', ['ERROR', 'Konto bara w budowie...']);
    return res.redirect('/');
});

router.get('/my_user_account', authenticatedUsersBarsOnly, function (req, res) {
    res.render('my_user_account', {
        page: getPageVariable(req),
        title: 'Moje konto',
        user_data: req.user
    });
});

router.post('/edit_user_account', authenticatedUsersBarsOnly, function (req, res) {
    if (req.user.type != 'user') {
        console.log("[/delete_account] ERROR: EXPECTED USER ACCOUNT, GOT SOMETHING ELSE, DATA: ");
        console.log("req.user = ");
        printUserData(req);
        req.flash('FLASH_MSG', ['ERROR', 'Przepraszamy, wystąpił błąd po stronie serwera']);
        return res.redirect('/');
    }

    var telephone = req.body.telephone.replace("'", "''");
    var password = req.body.password.replace("'", "''");
    var email = req.body.email.replace("'", "''");
    var first_name = req.body.first_name.replace("'", "''");
    var last_name = req.body.last_name.replace("'", "''");
    if (email == req.user.email) email = '';

    isEmailAvailable(email, 'Uzytkownicy').then(function (value) {
        updateUserInDB(password, first_name, last_name, email, telephone, res, req);
    }, (reason) => {
        if (typeof (reason) === 'undefined') //nigdy nie powinno do tego wejsc
        {
            console.log("[/edit_account.isEmailAvailable] UNDEFINED REASON");
            res.render('my_user_account', {
                page: getPageVariable(req),
                title: 'Moje konto',
                user_data: req.user,
                type: 'ERROR',
                msg: "Przepraszamy, wystąpił błąd po stronie serwera"
            });
        } else if (reason == 1)
            res.render('my_user_account', {
                page: getPageVariable(req),
                title: 'Moje konto',
                user_data: req.user,
                type: 'ERROR',
                msg: "Ten e-mail już jest zajęty"
            });
        else {
            console.log("[/edit_account.isEmailAvailable] SQL_ERROR: " + reason);
            res.render('my_user_account', {
                page: getPageVariable(req),
                title: 'Moje konto',
                user_data: req.user,
                type: 'ERROR',
                msg: "Przepraszamy, wystąpił błąd po stronie serwera"
            });
        }
    });
});

router.post('/delete_account', authenticatedUsersBarsOnly, function (req, res) {
    if (req.user.type != 'user') {
        console.log("[/delete_account] ERROR: EXPECTED USER ACCOUNT, GOT SOMETHING ELSE, DATA: ");
        console.log("req.user = ");
        printUserData(req);
        req.flash('FLASH_MSG', ['ERROR', 'Przepraszamy, wystąpił błąd po stronie serwera']);
        return res.redirect('/');
    }
    dbconn.query("delete from Uzytkownicy where id_uzytkownika=" + req.user.userID, function (err, rows) {
        if (err) {
            req.flash('FLASH_MSG', ['ERROR', 'Przepraszamy, usunięcie użytkownika nie powiodło się']);
            console.log("[/delete_account] QUERY_DELETE_FAIL: " + err);
            return res.redirect('/');
        }
        req.logout();
        req.flash('FLASH_MSG', ['SUCCESS', 'Konto usunięto pomyślnie']);
        res.redirect('/');
    });
});

function updateUserInDB(password, first_name, last_name, email, telephone, res, req) {
    if (password != '') {
        const saltRounds = 10;
        bcrypt.genSalt(saltRounds, function (err, salt) {
            bcrypt.hash(password, salt, function (err, hash) {
                var query = "update Uzytkownicy set" + generateSQLString(hash, first_name, last_name, email, telephone) + " where id_uzytkownika=" + req.user.userID;
                console.log("Wyslano update do bazy danych: " + query);
                dbconn.query(query, function (err, rows) {
                    if (err) {
                        console.log("[/edit_account] SQL_UPDATE_ERROR: " + err);
                        return res.render('my_user_account', {
                            page: getPageVariable(req),
                            title: 'Moje konto',
                            user_data: req.user,
                            type: 'ERROR',
                            msg: "Przepraszamy, wystąpił błąd po stronie serwera"
                        });
                    }
                    updateReqUser(req, first_name, last_name, email, telephone);
                    res.render('my_user_account', {
                        page: getPageVariable(req),
                        title: "Rejestracja użytkownika",
                        user_data: req.user,
                        type: 'SUCCESS',
                        msg: 'Pomyślnie zmieniono dane'
                    });
                });
            });
        });
    } else {
        var query = "update Uzytkownicy set" + generateSQLString(password, first_name, last_name, email, telephone) + " where id_uzytkownika=" + req.user.userID;
        console.log("Wyslano update do bazy danych: " + query);
        dbconn.query(query, function (err, rows) {
            if (err) {
                console.log("[/edit_account] SQL_UPDATE_ERROR: " + err);
                return res.render('my_user_account', {
                    page: getPageVariable(req),
                    title: 'Moje konto',
                    user_data: req.user,
                    type: 'ERROR',
                    msg: "Przepraszamy, wystąpił błąd po stronie serwera"
                });
            }
            updateReqUser(req, first_name, last_name, email, telephone);
            res.render('my_user_account', {
                page: getPageVariable(req),
                title: "Moje konto",
                user_data: req.user,
                type: 'SUCCESS',
                msg: 'Pomyślnie zmieniono dane'
            });
        });
    }
}

function generateSQLString(password, first_name, last_name, email, telephone) {
    var query = '';
    if (password != '') query += " haslo='" + password + "'";
    if (first_name != '') query += sqlCommaHelper(query) + " imie='" + first_name + "'";
    if (last_name != '') query += sqlCommaHelper(query) + " nazwisko='" + last_name + "'";
    if (email != '') query += sqlCommaHelper(query) + " email='" + email + "'";
    if (telephone != '') query += sqlCommaHelper(query) + " telefon='" + telephone + "'";
    return query;
}

function sqlCommaHelper(query) {
    if (query == '') return '';
    return ',';
}

function updateReqUser(req, first_name, last_name, email, telephone) {
    if (first_name != '') req.user.first_name = first_name;
    if (last_name != '') req.user.last_name = last_name;
    if (email != '') req.user.email = email;
    if (telephone != '') req.user.telephone = telephone;
}



module.exports = router;