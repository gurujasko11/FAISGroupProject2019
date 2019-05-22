var express = require('express');
var router = express.Router();
var indexModule = require('./index');
var getPageVariable = indexModule.getPageVariable;
var authenticationModule = require('./authentication');
var notAuthenticatedUserBar = authenticationModule.notAuthenticatedUserBar;

router.get('/register_bar', notAuthenticatedUserBar, function (req, res, next) {
    res.render('register_bar', {
        page: getPageVariable(req),
        title: 'Rejestracja baru'
    });
});

router.post('/register_bar', notAuthenticatedUserBar, function (req, res, next) {
    var bar_name = req.body.bar_name.replace("'", "''");
    var telephone = req.body.telephone.replace("'", "''");
    var city = req.body.city.replace("'", "''");
    var street = req.body.street.replace("'", "''");
    var building_number = req.body.building_number.replace("'", "''");
    var local_number = req.body.local_number.replace("'", "''");
    var password = req.body.password.replace("'", "''");
    var email = req.body.email.replace("'", "''");


    validateCityInDB(city).then(function (value) {
        isEmailAvailable(email, 'Bary').then(function (value) {
            addBarToDB(password, bar_name, telephone, city, street, building_number, local_number, email, res, req);
        }, (reason) => { //email jest zajety/zapytanie o email sie nie powiodlo
            if (typeof (reason) === 'undefined') //nigdy nie powinno do tego wejsc
            {
                console.log("[/register_bar.isEmailAvailable] UNDEFINED REASON");
                res.render('register_bar', {
                    page: getPageVariable(req),
                    title: "Rejestracja baru",
                    type: 'ERROR',
                    msg: "Przepraszamy, wystąpił błąd po stronie serwera"
                });
            } else if (reason == 1) res.render('register_bar', {
                page: getPageVariable(req),
                title: "Rejestracja baru",
                type: 'ERROR',
                msg: "Ten e-mail już jest zajęty"
            });
            else {
                console.log("[/register_bar.isEmailAvailable] SQL_ERROR: " + reason);
                res.render('register_bar', {
                    page: getPageVariable(req),
                    title: "Rejestracja baru",
                    type: 'ERROR',
                    msg: "Przepraszamy, wystąpił błąd po stronie serwera"
                });
            }
        });
    }, (reason) => { //dodanie miasta sie nie powiodlo
        console.log("[/register_bar.validateCityInDB] SQL_ERROR: " + reason);
        res.render('register_bar', {
            page: getPageVariable(req),
            title: "Rejestracja baru",
            type: 'ERROR',
            msg: "Przepraszamy, wystąpił błąd po stronie serwera"
        });
        return;
    });
});

router.get('/register_user', notAuthenticatedUserBar, function (req, res, next) {
    res.render('register_user', {
        page: getPageVariable(req),
        title: 'Rejestracja użytkownika'
    });
});

router.post('/register_user', notAuthenticatedUserBar, function (req, res, next) {
    var telephone = req.body.telephone.replace("'", "''");
    var password = req.body.password.replace("'", "''");
    var email = req.body.email.replace("'", "''");
    var first_name = req.body.first_name.replace("'", "''");
    var last_name = req.body.last_name.replace("'", "''");
    if (telephone == '') telephone = 'NULL';
    if (first_name == '') first_name = 'NULL';
    if (last_name == '') last_name = 'NULL';


    isEmailAvailable(email, 'Uzytkownicy').then(function (value) {
        addUserToDB(password, first_name, last_name, email, telephone, res, req);
    }, (reason) => {
        if (typeof (reason) === 'undefined') //nigdy nie powinno do tego wejsc
        {
            console.log("[/register_user.isEmailAvailable] UNDEFINED REASON");
            res.render('register_user', {
                page: getPageVariable(req),
                title: "Rejestracja użytkownika",
                type: 'ERROR',
                msg: "Przepraszamy, wystąpił błąd po stronie serwera"
            });
        } else if (reason == 1) res.render('register_user', {
            page: getPageVariable(req),
            title: "Rejestracja użytkownika",
            type: 'ERROR',
            msg: "Ten e-mail już jest zajęty"
        });
        else {
            console.log("[/register_user.isEmailAvailable] SQL_ERROR: " + reason);
            res.render('register_user', {
                page: getPageVariable(req),
                title: "Rejestracja użytkownika",
                type: 'ERROR',
                msg: "Przepraszamy, wystąpił błąd po stronie serwera"
            });
        }
    });
});

function validateCityInDB(city) {
    return new Promise(function (resolve, reject) {
        dbconn.query("select * from Miasta where miasto = '" + city + "'", function (err, rows) {
            if (err) {
                console.log("[validateCityInDB] query: " + "select * from Miasta where miasto = '" + city + "'" + "\n --> ERR: " + err);
                reject(err);
                return;
            }
            if (!rows.length) {
                dbconn.query("insert into Miasta (miasto) values ('" + city + "')", function (err, rows) {
                    if (err) {
                        console.log("[validateCityInDB] query: " + "insert into Miasta (miasto) values ('" + city + "')" + "\n --> ERR: " + err);
                        reject(err);
                    }
                });
            }
            resolve();
        });
    });
}

function isEmailAvailable(email, tableNameInDB) {
    return new Promise(function (resolve, reject) {
        dbconn.query("select * from " + tableNameInDB + " where email = '" + email + "'", function (err, rows) {
            if (err) {
                console.log("[isEmailAvailable] query: " + "select * from " + tableNameInDB + " where email = '" + email + "';" + "\n --> ERR: " + err);
                reject(err);
            }
            if (rows.length >= 1) reject(rows.length);
            else resolve();
        });
    });
}

function addBarToDB(password, bar_name, telephone, city, street, building_number, local_number, email, res, req) {
    const saltRounds = 10;
    bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
            var query = "insert into Bary (nazwa_baru, telefon, miasto, ulica, numer_budynku, numer_lokalu, haslo, email) values " +
                "('" + bar_name + "', '" + telephone + "', '" + city + "', '" + street + "', '" + building_number + "', '" + local_number + "', '" + hash + "', '" + email + "');";
            console.log("Wyslano insert do bazy danych: " + query);
            dbconn.query(query, function (err, rows) {
                if (err) {
                    console.log("[/register_bar] SQL_INSERT_ERROR: " + err);
                    res.render('register_bar', {
                        page: getPageVariable(req),
                        title: "Rejestracja baru",
                        type: 'ERROR',
                        msg: "Przepraszamy, wystąpił błąd po stronie serwera"
                    });
                } else
                    res.render('register_bar', {
                        page: getPageVariable(req),
                        title: "Rejestracja baru",
                        type: 'SUCCESS',
                        msg: "Pomyślnie utworzono konto."
                    });
            });
        });
    });
}

function addUserToDB(password, first_name, last_name, email, telephone, res, req) {
    const saltRounds = 10;
    bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
            var query = "insert into Uzytkownicy (imie, nazwisko, email, telefon, haslo) values " +
                "('" + first_name + "', '" + last_name + "', '" + email + "', '" + telephone + "', '" + hash + "');";
            console.log("Wyslano insert do bazy danych: " + query);
            dbconn.query(query, function (err, rows) {
                if (err) {
                    console.log("[/register_user] SQL_INSERT_ERROR: " + err);
                    res.render('register_user', {
                        page: getPageVariable(req),
                        title: 'Rejestracja użytkownika',
                        type: 'ERROR',
                        msg: "Przepraszamy, wystąpił błąd po stronie serwera"
                    });
                } else
                    res.render('register_user', {
                        page: getPageVariable(req),
                        title: "Rejestracja użytkownika",
                        type: 'SUCCESS',
                        msg: 'Pomyślnie utworzono konto.'
                    });
            });
        });
    });
}

module.exports = {
    router: router,
    isEmailAvailable: isEmailAvailable
};