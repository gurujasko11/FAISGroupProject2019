var express = require('express');
var router = express.Router();
var indexModule = require('./index');
var bcrypt = require('bcrypt');
var getPageVariable = indexModule.getPageVariable;
var authenticationModule = require('./authentication');
var notAuthenticatedOnly = authenticationModule.notAuthenticatedOnly;
var randtoken = require('rand-token');
var uid = require('rand-token').uid;
const nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'zespolowe.fais@gmail.com',
        pass: 'alama100$'
    }
});

router.get('/register_bar', notAuthenticatedOnly, function (req, res, next) {
    res.render('register_bar', {
        page: getPageVariable(req),
        title: 'Rejestracja baru'
    });
});

router.post('/register_bar', notAuthenticatedOnly, function (req, res, next) {
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

router.get('/register_user', notAuthenticatedOnly, function (req, res, next) {
    res.render('register_user', {
        page: getPageVariable(req),
        title: 'Rejestracja użytkownika'
    });
});

router.post('/register_user', notAuthenticatedOnly, function (req, res, next) {
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

router.get('/sentReset/:isBar/:email', function (req, res) {
    let table = "Uzytkownicy";
    if (req.param("isBar", 0) == 1) {
        table = "Bary";
    }
    console.debug('SELECT `haslo` FROM `' + table + '` WHERE email = "' + req.param("email", 0) + '"');
    dbconn.query('SELECT `haslo` FROM `' + table + '` WHERE email = "' + req.param("email", 0) + '"', function (err, result) {
        if (result.length == 0) {
            req.flash("FLASH_MSG", ['ERROR', 'Wprowadzony adres e-mail jest niepoprawny']);
            res.render('login', {
                page: getPageVariable(req),
                title: 'Logowanie',
                flash_messages: req.flash('FLASH_MSG')
            });
        } else {
            let ans = result[0].haslo;
            console.debug(ans);
            ans = ans.replace(/\//g, "-sl-");
            let link = 'http://localhost:3000/resetPassw/' + req.param("isBar", 0) + "/" + ans;
            var mailOptions = {
                from: 'Nodemailer@gmail.com',
                to: req.param("email", 0),
                subject: 'Resetowanie hasła - Drink and watch',
                html: 'Witaj! <br>' +
                    'Aby ustawić nowe hasło kliknij poniższy link:<br>' +
                    '<a href=' + link + '>' + link + '</a>' +
                    '<br>Pozdrawiam, <br>Wlasciciel strony'
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    req.flash("FLASH_MSG", ['ERROR', 'Błąd serwera, ponów próbę - nie udało się wysłac linku do zresetowania hasła']);
                    res.render('login', {
                        page: getPageVariable(req),
                        title: 'Logowanie',
                        flash_messages: req.flash('FLASH_MSG')
                    });
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                    req.flash("FLASH_MSG", ['SUCCESS', 'Wysłano link do zresetowania hasła - sprawdź maila']);
                    res.render('login', {
                        page: getPageVariable(req),
                        title: 'Logowanie',
                        flash_messages: req.flash('FLASH_MSG')
                    });
                }
            });
        }

    });
});

router.get('/resetPassw/:isBar/:Token', function (req, res) {
    let table = "Uzytkownicy";
    let token = req.param("Token", 0);
    token = token.replace(/-sl-/g, "/");
    if (req.param("isBar", 0) == 1) {
        table = "Bary";
    }

    dbconn.query('SELECT * FROM `' + table + '` WHERE `haslo` = "' + token + '"', function (err, result) {
        if (result.length == 0) {
            res.render('error', {
                page: 'Element is not found is database',
                title: 'Informacje o barze'
            });
        } else {
            //console.debug(result);
            res.render('newPasswd', {
                page: getPageVariable(req),
                title: 'Zmiana hasła',
                isBar: req.param("isBar", 0),
                token: req.param("Token", 0),
                flash_messages: req.flash('FLASH_MSG')
            });
        }
    });

});

router.post('/setPassw/:isBar/:Token', function (req, res, next) {
    var password = req.body.password.replace("'", "''");

    const saltRounds = 10;

    let table = "Uzytkownicy";
    let token = req.param("Token", 0);
    token = token.replace(/-sl-/g, "/");
    if (req.param("isBar", 0) == 1) {
        table = "Bary";
    }

    bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
            dbconn.query('SELECT * FROM `' + table + '` WHERE `haslo` = "' + token + '"', function (err, result) {
                if (result.length == 0) {
                    res.render('error', {
                        page: 'Element is not found is database',
                        title: 'Informacje o barze'
                    });
                } else {
                    //console.debug(result);
                    let que = 'UPDATE ' + table + ' SET haslo = \"' + hash + '\" WHERE haslo = \"' + token + '\"';
                    //console.debug(que);
                    dbconn.query(que),
                        function (err, result) {
                            //console.debug(err);
                        }
                    req.flash('FLASH_MSG', ['SUCCESS', 'Hasło zostało zmienione']);
                    res.render('login', {
                        page: getPageVariable(req),
                        title: 'Logowanie',
                        flash_messages: req.flash('FLASH_MSG')
                    });
                }
            });
        })
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
    var token = uid(60);
    bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
            var query = "insert into Bary (nazwa_baru, telefon, miasto, ulica, numer_budynku, numer_lokalu, haslo, email,status) values " +
                "('" + bar_name + "', '" + telephone + "', '" + city + "', '" + street + "', '" + building_number + "', '" + local_number + "', '" + hash + "', '" + email + "','" + token + "');";
            console.log("Wyslano insert do bazy danych: " + query);
            dbconn.query(query, function (err, rows) {

                var mailOptions = {
                    from: 'Nodemailer@gmail.com',
                    to: email,
                    subject: 'Registration to our service - Drink and watch',
                    text: 'Hello \n' +
                        'To confirm registration click on the link below:\n' +
                        'http://localhost:3000/activateBar/' + token + '\nBests, \nProject team'
                };

                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log("[/register_bar] SendMail error: " + error);

                        res.render('register_bar', {
                            page: getPageVariable(req),
                            title: "Rejestracja baru",
                            type: 'ERROR',
                            msg: "Przepraszamy, wystąpił błąd po stronie serwera",
                            flash_messages: req.flash("FLASH_MSG")
                        });
                    } 
                    else if (err) {
                        console.log("[/register_bar] SQL_INSERT_ERROR: " + err);

                        res.render('register_bar', {
                            page: getPageVariable(req),
                            title: "Rejestracja baru",
                            type: 'ERROR',
                            msg: "Przepraszamy, wystąpił błąd po stronie serwera",
                            flash_messages: req.flash("FLASH_MSG")
                        });
                    }
                    else {
                        console.log('Email sent: ' + info.response);
                    
                        res.render('register_bar', {
                            page: getPageVariable(req),
                            title: "Rejestracja baru",
                            type: 'SUCCESS',
                            msg: "Pomyślnie utworzono konto. Sprawdź maila aby dokonać aktywacji",
                            flash_messages: req.flash("FLASH_MSG")
                        });
                    }
                });

            });
        });
    });
}

function addUserToDB(password, first_name, last_name, email, telephone, res, req) {
    const saltRounds = 10;
    var token = uid(60);
    bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
            var query = "insert into Uzytkownicy (imie, nazwisko, email, telefon, haslo,status) values " +
                "('" + first_name + "', '" + last_name + "', '" + email + "', '" + telephone + "', '" + hash + "', '" + token + "');";
            console.log("Wyslano insert do bazy danych: " + query);
            dbconn.query(query, function (err, rows) {

                var mailOptions = {
                    from: 'Nodemailer@gmail.com',
                    to: email,
                    subject: 'Registration to our service - Drink and watch',
                    text: 'Hello \n' +
                        'To confirm registration click on the link below:\n' +
                        'http://localhost:3000/activate/' + token + '\nBests, \nProject team'
                };

                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log("[/register_user] SendMail error: " + error);

                        res.render('register_user', {
                            page: getPageVariable(req),
                            title: 'Rejestracja użytkownika',
                            type: 'ERROR',
                            msg: "Przepraszamy, wystąpił błąd po stronie serwera",
                            flash_messages: req.flash("FLASH_MSG")
                        });
                    } else if(err){
                        console.log("[/register_user] SQL_INSERT_ERROR: " + err);

                        res.render('register_user', {
                            page: getPageVariable(req),
                            title: 'Rejestracja użytkownika',
                            type: 'ERROR',
                            msg: "Przepraszamy, wystąpił błąd po stronie serwera",
                            flash_messages: req.flash("FLASH_MSG")
                        });
                    }
                    else{
                        console.log('Email sent: ' + info.response);
                        req.flash("FLASH_MSG", ['INFO', 'Wysłano link aktywacyjny - sprawdź maila']);
                    
                        res.render('register_user', {
                            page: getPageVariable(req),
                            title: "Rejestracja użytkownika",
                            type: 'SUCCESS',
                            msg: 'Pomyślnie utworzono konto. Sprawdź maila aby dokonać aktywacji',
                            flash_messages: req.flash("FLASH_MSG")
                        });
                    }
                });
            });
        });
    });
}

module.exports = {
    router: router,
    isEmailAvailable: isEmailAvailable
};