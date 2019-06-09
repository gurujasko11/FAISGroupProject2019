var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");
const moment = require('moment');

// mailer setting
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'zespolowe.fais@gmail.com',
        pass: 'alama100$'
    }
});

//routes
router.get('/', function (req, res, next) {
    dbconn.query('SELECT Mecze.czas, dr1.nazwa_druzyny as team1, dr2.nazwa_druzyny as team2 ' +
        'FROM Mecze LEFT JOIN Druzyny dr1 ON dr1.id_druzyny = Mecze.id_druzyna1 LEFT JOIN ' +
        'Druzyny dr2 ON dr2.id_druzyny = Mecze.id_druzyna2 WHERE DATE(czas) > CURDATE() ' +
        'ORDER BY czas LIMIT 10',
        function (err, result) {
            res.render('index', {
                page: getPageVariable(req),
                title: 'MatchBar',
                mecze: result,
                flash_messages: req.flash('FLASH_MSG')
            });
        });
});

router.get('/bar/:barId', function (req, res, next) {
    dbconn.query('SELECT * FROM `Bary` WHERE `id_baru` = "' + req.param("barId", 0) + '"', function (err, result) {
        if (result.length == 0) {
            res.render('error', {
                page: 'Element is not found is database',
                title: 'Informacje o barze'
            });
        } else {
            res.render('bar_user', {
                page: getPageVariable(req),
                title: 'Informacje o barze',
                barName: result[0].nazwa_baru,
                email: result[0].email,
                barTel: result[0].telefon,
                town: result[0].miasto,
                street: result[0].ulica,
                number1: result[0].numer_budynku,
                number2: result[0].numer_lokalu
            });
        }
    });
});

router.get('/about', function (req, res, next) {
    res.render('about', {
        page: getPageVariable(req),
        title: 'O stronie'
    });
});

router.get('/test', function (req, res) {
    console.log("[/TEST] Zalogowany? " + req.isAuthenticated());
    if (req.isAuthenticated()) {
        console.log("[/TEST] req.user = ");
        printUserData(req);
    }
    res.redirect('/');
});

router.get('/bar_home', function (req, res, next) {
    res.render('bar_home', {
        page: getPageVariable(req),
        title: 'Moje mecze'
    });
});

router.get('/add_match', function (req, res, next) {
    res.render('add_match', {
        page: getPageVariable(req),
        title: 'Dodaj mecz'
    });
});

router.get('/account', function (req, res, next) {
    res.render('account', {
        page: getPageVariable(req),
        title: 'Konto'
    });
});

router.post('/search_match', function (req, res, next) {
    console.log(req.body.search_text)
    teams = req.body.search_text.split(',')
    query = "SELECT czas, id_meczu, t1.nazwa_druzyny as home, t2.nazwa_druzyny as away\n" +
        "  FROM Zespolowe.Mecze m, Zespolowe.Druzyny t1, Zespolowe.Druzyny t2 \n" +
        " WHERE m.id_druzyna1 = t1.id_druzyny\n" +
        "   AND m.id_druzyna2 = t2.id_druzyny" +
        "   AND t1.nazwa_druzyny = \'" + teams[0] +
        "\'   AND t2.nazwa_druzyny = \'" + teams[1] + "\'";
    dbconn.query(query, function (err, rows) {
        if (err) res.render('search_match_result', {
            page: getPageVariable(req),
            title: err,
            desc: err.msg
        });
        else {
            res.render('search_match_result', {
                page: getPageVariable(req),
                title: 'Wyniki wyszukiwania',
                args: rows
            });
        }
    });
});


function getPageVariable(req) {
    if (req.isAuthenticated())
        if(req.user.type != 'user')
            return "authenticatedBar";
        else
            return "authenticatedUser";
    else
        return "main";
}

function printUserData(req) {
    if (req == undefined) console.log("[printUserData] ERROR: req is undefined");
    console.log(JSON.stringify(req.user, null, 3));
}


var obj = {};

router.post('/edit_bar', function (req, res, next) {

    var password_changed = false;
    if (req.body.password.length > 0) {
        password_changed = true;
    }

    var bar_name = "'" + req.body.bar_name.replace("'", "''") + "'";
    var telephone = "'" + req.body.telephone.replace("'", "''") + "'";
    var city = "'" + req.body.city.replace("'", "''") + "'";
    var street = "'" + req.body.street.replace("'", "''") + "'";
    var building_number = "'" + req.body.building_number.replace("'", "''") + "'";
    var local_number = "'" + req.body.local_number.replace("'", "''") + "'";
    var password = req.body.password.replace("'", "''");
    var email = "'" + req.body.email.replace("'", "''") + "'";

    const saltRounds = 10;
    bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {

            if (password_changed) {
                var query = "UPDATE Bary " +
                    "SET nazwa_baru = " + bar_name + ", telefon = " + telephone + ", miasto = " + city + ", ulica = " + street +
                    ", numer_budynku = " + building_number + ", numer_lokalu = " + local_number + ", haslo = '" + hash +
                    "', email = " + email +
                    " WHERE id_baru = '" + req.user.barID + "'";
            } else {
                query = "UPDATE Bary " +
                    "SET nazwa_baru = " + bar_name + ", telefon = " + telephone + ", miasto = " + city + ", ulica = " + street +
                    ", numer_budynku = " + building_number + ", numer_lokalu = " + local_number +
                    ", email = " + email +
                    " WHERE id_baru = '" + req.user.barID + "'";
            }
            console.log("Wyslano update do bazy danych: " + query);
            dbconn.query(query, function (err, rows) {
                if (err) {
                    console.log(err);
                    req.flash('FLASH_MSG', ["ERROR", "Nie udało się zapisać zmian"])
                } else {
                    req.flash('FLASH_MSG', ["SUCCESS", "Pomyślnie zapisano zmiany"])
                }
                res.redirect('/edit_bar')
            });
        });
    });
});

router.get('/teams', function (req, res, next) {

    dbconn.query('SELECT * FROM Druzyny', function (err, result) {

        if (err) {
            throw err;
        } else {
            obj = {
                print: result,
                page: getPageVariable(req),
                title: 'Drużyny'
            };
            res.render('teams', obj);
        }
    });

});

router.get('/about/match/:id', function (req, res, next) {
    match_id = req.params.id
    console.log(req.body.search_text)
    query = "SELECT t1.id_baru, t1.id_meczu, t2.nazwa_baru, t2.miasto, t2.ulica, t2.numer_budynku, t2.numer_lokalu\n" +
        "FROM Zespolowe.Bary_Z_Meczami t1, Zespolowe.Bary t2\n" +
        "WHERE t1.id_meczu = 1\n" +
        "AND t1.id_baru = t2.id_baru;";
    dbconn.query(query, function (err, rows) {
        if (err) res.render('search_match_result', {
            page: getPageVariable(req),
            title: err,
            desc: err.msg
        });
        else {
            res.render('about_match', {
                page: getPageVariable(req),
                title: 'Gdzie rozgrywany jest mecz',
                args: rows
            });
        }
    });
});

router.get('/edit_bar', function (req, res, next) {
    if (req.isAuthenticated()) {
        var query = "SELECT nazwa_baru, telefon, miasto, ulica, numer_budynku, numer_lokalu, haslo, email " +
            "FROM Bary " +
            "WHERE id_baru = '" + req.user.barID + "'";

        dbconn.query(query, function (err, rows) {
            // console.log(err);
            console.log(rows);

            if (err) res.render('edit_bar', {
                page: getPageVariable(req),
                title: "Edycja baru",
                type: 'ERROR',
                msg: "Cos poszło nie tak z pobraniem danych konta",
                bar: null,
                flash_messages: req.flash("FLASH_MSG")
            });
            else res.render('edit_bar', {
                page: getPageVariable(req),
                title: "Edycja baru",
                bar: rows[0],
                flash_messages: req.flash("FLASH_MSG")
            });
        });
    } else {
        res.redirect('/');
    }
});

function get_bar_data(barID) {
    return new Promise(function (resolve, reject) {

        var query = "SELECT nazwa_baru, telefon, miasto, ulica, numer_budynku, numer_lokalu, haslo, email " +
            "FROM Bary " +
            "WHERE id_baru = '" + barID + "'";
        dbconn.query(query, function (err, rows) {
            // console.log(err);
            console.log(rows);
            if (!err)
                resolve(rows[0]);
            else
                reject(err);
        });
    });
}

router.get('/delete_bar', function (req, res, next) {
    if (!req.isAuthenticated()) {
        res.redirect('/');
    }
    res.render('delete_bar', {
        page: getPageVariable(req),
        title: 'Usuń bar'
    });
});


router.post('/delete_bar', function (req, res, next) {
    var query = "DELETE FROM Bary WHERE id_baru = '" + req.user.barID + "'";
    dbconn.query(query, function (err, rows) {
        console.log(err);
        req.logout();
        res.redirect('/');

    });
});

router.get('/match_schedule', function (req, res, next) {
    var orderBy = 'czas';
    if (req.query.orderBy) {
        orderBy = req.query.orderBy;
    }

    if (orderBy == 'nazwa_baru' || orderBy == 'miasto') {



        dbconn.query(
            "SELECT b.nazwa_baru, m.id_druzyna1, m.id_druzyna2, bzm.czas, b.miasto FROM (( Bary_Z_Meczami  as bzm LEFT JOIN Bary  as b ON bzm.id_baru = b.id_baru) LEFT JOIN Mecze as m ON bzm.id_meczu = m.id_meczu ) ORDER BY b." + orderBy,
            function (err, result) {
                const emptyArray = [];
                if (result === undefined) {
                    res.render('match_schedule', {
                        page: getPageVariable(req),
                        title: 'Terminarz rozrywek',
                        data: emptyArray
                    });
                }

                dbconn.query(
                    "SELECT * FROM Druzyny",
                    function (err, teams) {
                        if (teams) {
                            // console.log(teams)

                            const matches = [];

                            function getTeamName(id) {
                                var name = 'Druzyna nie znana';

                                for (var i = 0; i < teams.length; i++) {
                                    if (teams[i].id_druzyny == id) {
                                        return teams[i].nazwa_druzyny;
                                    }
                                }
                                return name;
                            }

                            result.map(function (singleResult) {
                                const match = {
                                    nazwa_baru: singleResult.nazwa_baru,
                                    czas: singleResult.czas,
                                    druzyna1: getTeamName(singleResult.id_druzyna1),
                                    druzyna2: getTeamName(singleResult.id_druzyna2),
                                    miasto: singleResult.miasto
                                };
                                matches.push(match);
                            });

                            res.render('match_schedule', {
                                page: getPageVariable(req),
                                title: 'Terminarz rozrywek',
                                data: matches,
                                moment: moment
                            });

                        }
                    }
                );
            }
        );






    } else if (orderBy == 'id_druzyna1') {


        dbconn.query(
            "SELECT b.nazwa_baru, m.id_druzyna1, m.id_druzyna2, bzm.czas, b.miasto FROM (( Bary_Z_Meczami  as bzm LEFT JOIN Bary  as b ON bzm.id_baru = b.id_baru) LEFT JOIN Mecze as m ON bzm.id_meczu = m.id_meczu ) ORDER BY m." + orderBy,
            function (err, result) {
                const emptyArray = [];
                if (result === undefined) {
                    res.render('match_schedule', {
                        page: getPageVariable(req),
                        title: 'Terminarz rozrywek',
                        data: emptyArray
                    });
                }

                dbconn.query(
                    "SELECT * FROM Druzyny",
                    function (err, teams) {
                        if (teams) {
                            // console.log(teams)

                            const matches = [];

                            function getTeamName(id) {
                                var name = 'Druzyna nie znana';

                                for (var i = 0; i < teams.length; i++) {
                                    if (teams[i].id_druzyny == id) {
                                        return teams[i].nazwa_druzyny;
                                    }
                                }
                                return name;
                            }

                            result.map(function (singleResult) {
                                const match = {
                                    nazwa_baru: singleResult.nazwa_baru,
                                    czas: singleResult.czas,
                                    druzyna1: getTeamName(singleResult.id_druzyna1),
                                    druzyna2: getTeamName(singleResult.id_druzyna2),
                                    miasto: singleResult.miasto
                                };
                                matches.push(match);
                            });


                            matches.sort(function (a, b) {
                                return a.druzyna1.localeCompare(b.druzyna1);
                            });

                            res.render('match_schedule', {
                                page: getPageVariable(req),
                                title: 'Terminarz rozrywek',
                                data: matches,
                                moment: moment
                            });

                        }
                    }
                );
            }
        );


    } else if (orderBy == 'id_druzyna2') {


        dbconn.query(
            "SELECT b.nazwa_baru, m.id_druzyna1, m.id_druzyna2, bzm.czas, b.miasto FROM (( Bary_Z_Meczami  as bzm LEFT JOIN Bary  as b ON bzm.id_baru = b.id_baru) LEFT JOIN Mecze as m ON bzm.id_meczu = m.id_meczu ) ORDER BY m." + orderBy,
            function (err, result) {
                const emptyArray = [];
                if (result === undefined) {
                    res.render('match_schedule', {
                        page: getPageVariable(req),
                        title: 'Terminarz rozrywek',
                        data: emptyArray
                    });
                }

                dbconn.query(
                    "SELECT * FROM Druzyny",
                    function (err, teams) {
                        if (teams) {
                            // console.log(teams)

                            const matches = [];

                            function getTeamName(id) {
                                var name = 'Druzyna nie znana';

                                for (var i = 0; i < teams.length; i++) {
                                    if (teams[i].id_druzyny == id) {
                                        return teams[i].nazwa_druzyny;
                                    }
                                }
                                return name;
                            }

                            result.map(function (singleResult) {
                                const match = {
                                    nazwa_baru: singleResult.nazwa_baru,
                                    czas: singleResult.czas,
                                    druzyna1: getTeamName(singleResult.id_druzyna1),
                                    druzyna2: getTeamName(singleResult.id_druzyna2),
                                    miasto: singleResult.miasto
                                };
                                matches.push(match);
                            });


                            matches.sort(function (a, b) {
                                return a.druzyna2.localeCompare(b.druzyna2);
                            });

                            res.render('match_schedule', {
                                page: getPageVariable(req),
                                title: 'Terminarz rozrywek',
                                data: matches,
                                moment: moment
                            });

                        }
                    }
                );
            }
        );

    } else {
        dbconn.query(
            "SELECT b.nazwa_baru, m.id_druzyna1, m.id_druzyna2, bzm.czas, b.miasto FROM (( Bary_Z_Meczami  as bzm LEFT JOIN Bary  as b ON bzm.id_baru = b.id_baru) LEFT JOIN Mecze as m ON bzm.id_meczu = m.id_meczu ) ORDER BY m." + orderBy,
            function (err, result) {
                const emptyArray = [];
                if (result === undefined) {
                    res.render('match_schedule', {
                        page: getPageVariable(req),
                        title: 'Terminarz rozrywek',
                        data: emptyArray
                    });
                }

                dbconn.query(
                    "SELECT * FROM Druzyny",
                    function (err, teams) {
                        if (teams) {
                            // console.log(teams)

                            const matches = [];

                            function getTeamName(id) {
                                var name = 'Druzyna nie znana';

                                for (var i = 0; i < teams.length; i++) {
                                    if (teams[i].id_druzyny == id) {
                                        return teams[i].nazwa_druzyny;
                                    }
                                }
                                return name;
                            }

                            result.map(function (singleResult) {
                                const match = {
                                    nazwa_baru: singleResult.nazwa_baru,
                                    czas: singleResult.czas,
                                    druzyna1: getTeamName(singleResult.id_druzyna1),
                                    druzyna2: getTeamName(singleResult.id_druzyna2),
                                    miasto: singleResult.miasto
                                };
                                matches.push(match);
                            });

                            res.render('match_schedule', {
                                page: getPageVariable(req),
                                title: 'Terminarz rozrywek',
                                data: matches,
                                moment: moment
                            });

                        }
                    }
                );
            }
        );
    }
});

module.exports = {
    router: router,
    printUserData: printUserData,
    getPageVariable: getPageVariable
};
