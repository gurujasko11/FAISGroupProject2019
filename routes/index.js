var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res, next) {
	dbconn.query('SELECT Mecze.czas, dr1.nazwa_druzyny as team1, dr2.nazwa_druzyny as team2 ' +
		'FROM Mecze LEFT JOIN Druzyny dr1 ON dr1.id_druzyny = Mecze.id_druzyna1 LEFT JOIN ' +
		'Druzyny dr2 ON dr2.id_druzyny = Mecze.id_druzyna2 WHERE DATE(czas) > CURDATE() ' +
		'ORDER BY czas LIMIT 10', function (err, result) {
		res.render('index', { page: getPageVariable(req), title: 'MatchBar', mecze: result, flash_messages: req.flash('FLASH_MSG') });

	});
});

router.get('/dev', function (req, res, next) {
    res.render('template', {page: getPageVariable(req), title: 'CSS Test'});
});

// router.get('/match', function(req, res, next) {
//   res.render('wip', { page: getPageVariable(req), title: 'Rozgrywki' });
// });


//////////////		PRZYPOMINANIE HASŁA - JAK KTOŚ UMIE TO PRZERZUCIĆ DO INNEGO PLIKU TO PROSZĘ TO ZROBIĆ :-)

const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'zespolowe.fais@gmail.com',
		pass: 'alama100$'
	}
});

router.get('/sentReset/:isBar/:email', function (req, res) {
	let table = "Uzytkownicy";
	if (req.param("isBar", 0) == 1) {
		table = "Bary";
	}
	console.debug('SELECT `haslo` FROM `' + table + '` WHERE email = "' + req.param("email",0) + '"');
	dbconn.query('SELECT `haslo` FROM `' + table + '` WHERE email = "' + req.param("email",0) + '"', function (err, result) {
		if (result.length == 0) {
			req.flash("FLASH_MSG", ['ERROR', 'Wprowadzony adres e-mail jest niepoprawny']);
			res.render('login', {page: getPageVariable(req), title: 'Logowanie', flash_messages: req.flash('FLASH_MSG')});
		}else{
			let ans = result[0].haslo;
			console.debug(ans);
			ans = ans.replace(/\//g,"-sl-");
			let link = 'http://localhost:3000/resetPassw/' + req.param("isBar", 0) + "/" + ans;
			var mailOptions = {
				from: 'Nodemailer@gmail.com',
			  to: req.param("email", 0),
				 subject: 'Resetowanie hasła - Drink and watch',
			  html: 'Witaj! <br>'
			  + 'Aby ustawić nowe hasło kliknij poniższy link:<br>'
			  + '<a href=' + link + '>' + link + '</a>'
			  + '<br>Pozdrawiam, <br>Wlasciciel strony'
			};
			
			transporter.sendMail(mailOptions, function (error, info) {
				if (error) {
					req.flash("FLASH_MSG", ['ERROR', 'Błąd serwera, ponów próbę - nie udało się wysłac linku do zresetowania hasła']);
					res.render('login', {page: getPageVariable(req), title: 'Logowanie', flash_messages: req.flash('FLASH_MSG')});
					console.log(error);
				} else {
					console.log('Email sent: ' + info.response);
					req.flash("FLASH_MSG", ['SUCCESS', 'Wysłano link do zresetowania hasła - sprawdź maila']);
					res.render('login', {page: getPageVariable(req), title: 'Logowanie', flash_messages: req.flash('FLASH_MSG')});
				}
			});
		}
		
	});
});

router.get('/resetPassw/:isBar/:Token', function (req, res) {
	let table = "Uzytkownicy";
	let token = req.param("Token",0);
	token = token.replace(/-sl-/g,"/");
	if (req.param("isBar", 0) == 1) {
		table = "Bary";
	}
	
	dbconn.query('SELECT * FROM `' + table + '` WHERE `haslo` = "' + token + '"', function (err, result) {
		if (result.length == 0)
		{
			res.render('error', { page: 'Element is not found is database', title: 'Informacje o barze' });
		} else {
			//console.debug(result);
			res.render('newPasswd', { page: getPageVariable(req), title: 'Zmiana hasła', isBar: req.param("isBar", 0), token: req.param("Token",0) , flash_messages: req.flash('FLASH_MSG') });
		}
	});
	
});

router.post('/setPassw/:isBar/:Token', function(req, res, next)
{
	var password = req.body.password.replace("'", "''");
	
	const saltRounds = 10;
	
	let table = "Uzytkownicy";
	let token = req.param("Token",0);
	token = token.replace(/-sl-/g,"/");
	if (req.param("isBar", 0) == 1) {
		table = "Bary";
	}
	
	bcrypt.genSalt(saltRounds, function (err, salt) {
		bcrypt.hash(password, salt, function (err, hash) {
			dbconn.query('SELECT * FROM `' + table + '` WHERE `haslo` = "' + token + '"', function (err, result) {
				if (result.length == 0)
				{
					res.render('error', { page: 'Element is not found is database', title: 'Informacje o barze' });
				} else {
					//console.debug(result);
					let que ='UPDATE ' + table + ' SET haslo = \"'+ hash +'\" WHERE haslo = \"' + token + '\"';
					//console.debug(que);
					dbconn.query(que), function (err, result) {
						//console.debug(err);
					}
					req.flash('FLASH_MSG', ['SUCCESS', 'Hasło zostało zmienione']);
					res.render('login', { page: getPageVariable(req), title: 'Logowanie', flash_messages: req.flash('FLASH_MSG') });
				}
			});
		})
	});
});

//////////////		PRZYPOMINANIE HASŁA - KONIEC

router.get('/bar/:barId', function(req, res, next) {
	dbconn.query('SELECT * FROM `Bary` WHERE `id_baru` = "' + req.param("barId",0) + '"', function (err, result) {
		if (result.length == 0)
		{
			res.render('error', { page: 'Element is not found is database', title: 'Informacje o barze' });
		} else {
			res.render('bar_user', {
				page: 'main',
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

router.get('/about', function(req, res, next) {
  res.render('about', { page: getPageVariable(req), title: 'O stronie' });
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
    res.render('bar_home', {page: 'main', title: 'Moje mecze'});
});

router.get('/add_match', function (req, res, next) {
    res.render('add_match', {page: 'main', title: 'Dodaj mecz'});
});

router.get('/account', function (req, res, next) {
    res.render('account', {page: 'main', title: 'Konto'});
});

router.post('/search_match', function (req, res, next) {
    console.log(req.body.search_text)
    teams = req.body.search_text.split(',')
    query = "SELECT czas, id_meczu, t1.nazwa_druzyny as home, t2.nazwa_druzyny as away\n" +
        "  FROM Zespolowe.Mecze m, Zespolowe.Druzyny t1, Zespolowe.Druzyny t2 \n" +
        " WHERE m.id_druzyna1 = t1.id_druzyny\n" +
        "   AND m.id_druzyna2 = t2.id_druzyny" +
        "   AND t1.nazwa_druzyny = \'" + teams[0] +
        "\'   AND t2.nazwa_druzyny = \'" + teams[1] + "\'"
    dbconn.query(query, function (err, rows) {
        if (err) res.render('search_match_result', {page: 'main', title: err, desc: err.msg});
        else {
            res.render('search_match_result', {page: 'main', title: 'Wyniki wyszukiwania', args: rows});
        }
    });
})

router.post('/register_bar', function (req, res, next) {
    //TODO: escape '
    var bar_name = req.body.bar_name;
    var telephone = req.body.telephone;
    var city = req.body.city;
    var street = req.body.street;
    var building_number = req.body.building_number;
    var local_number = req.body.local_number;
    var password = req.body.password;
    var email = req.body.email;
    var query = "insert into Bary (nazwa_baru, telefon, miasto, ulica, numer_budynku, numer_lokalu, haslo, email) values " +
        "('" + bar_name + "', '" + telephone + "', '" + city + "', '" + street + "', '" + building_number + "', '" + local_number + "', '" + password + "', '" + email + "');";

    console.log("Wyslano insert do bazy danych: " + query);
    dbconn.query(query, function (err, rows) {
        if (err) res.render('register_bar', {page: 'main', title: err, desc: err.msg});
        else res.render('register_bar', {page: 'main', title: "Pomyślnie utworzono konto"});
    });

})

router.get('/bar_login', function (req, res, next) {

    app.use(session({
        secret: '343ji43j4n3jn4jk3n'
    }));
    res.redirect('/');
});

function getPageVariable(req) {
    if (req.isAuthenticated())
        return "authenticated";
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
    if (req.body.password.length > 2) {
        password_changed = true
    }

    var bar_name = "'" + req.body.bar_name.replace("'", "''") + "'";
    var telephone = "'" + req.body.telephone.replace("'", "''") + "'";
    var city = "'" + req.body.city.replace("'", "''") + "'";
    var street = "'" + req.body.street.replace("'", "''") + "'";
    var building_number = "'" + req.body.building_number.replace("'", "''") + "'";
    var local_number = "'" + req.body.local_number.replace("'", "''") + "'";
    var password = "'" + req.body.password.replace("'", "''") + "'";
    var email = "'" + req.body.email.replace("'", "''") + "'";

    const saltRounds = 10;
    bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {

            var query = "UPDATE Bary " +
                "SET nazwa_baru = " + bar_name + ", telefon = " + telephone + ", miasto = " + city + ", ulica = " + street
                + ", numer_budynku = " + building_number + ", numer_lokalu = " + local_number + ", haslo = '" + hash +
                "', email = " + email +
                " WHERE id_baru = '" + req.user.barID + "'";

            if (!password_changed) {
                query = "UPDATE Bary " +
                    "SET nazwa_baru = " + bar_name + ", telefon = " + telephone + ", miasto = " + city + ", ulica = " + street
                    + ", numer_budynku = " + building_number + ", numer_lokalu = " + local_number +
                    "', email = " + email +
                    " WHERE id_baru = '" + req.user.barID + "'";
            }
            console.log("Wyslano update do bazy danych: " + query);
            dbconn.query(query, function (err, rows) {
                console.log(err);
            });
        });
    });
});

router.get('/teams', function (req, res, next) {

    dbconn.query('SELECT * FROM Druzyny', function (err, result) {

        if (err) {
            throw err;
        } else {
            obj = {print: result, page: getPageVariable(req), title: 'teams'};
            res.render('teams', obj);
        }
    });

    //res.render('teams', { page: getPageVariable(req), title: 'teams' });
});

router.get('/about/match/:id', function(req, res, next)
{
  match_id = req.params.id
  console.log(req.body.search_text)
  query = "SELECT t1.id_baru, t1.id_meczu, t2.nazwa_baru, t2.miasto, t2.ulica, t2.numer_budynku, t2.numer_lokalu\n" +
      "FROM Zespolowe.Bary_Z_Meczami t1, Zespolowe.Bary t2\n" +
      "WHERE t1.id_meczu = 1\n" +
      "AND t1.id_baru = t2.id_baru;"
  dbconn.query(query, function(err, rows)
  {
      if(err)  res.render('search_match_result', { page: 'main', title: err, desc: err.msg });
      else {
          res.render('about_match', { page: 'main', title: 'Gdzie rozgrywany jest mecz', args : rows});
      }
  });
});

router.get('/edit_bar', function (req, res, next) {
	if (req.isAuthenticated()){
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
							bar: null
					});
					else res.render('edit_bar', {
							page: getPageVariable(req),
							title: "Edycja baru",
							type: 'SUCCESS',
							msg: "Pomyślnie pobrano dane konta.",
							bar: rows[0]
					});
			});
	}
	else{
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


	})
}

router.post('/edit_bar', function (req, res, next) {
	var bar_name = "'" + req.body.bar_name.replace("'", "''") + "'";
	var telephone = "'" + req.body.telephone.replace("'", "''") + "'";
	var city = "'" + req.body.city.replace("'", "''") + "'";
	var street = "'" + req.body.street.replace("'", "''") + "'";
	var building_number = "'" + req.body.building_number.replace("'", "''") + "'";
	var local_number = "'" + req.body.local_number.replace("'", "''") + "'";
	var password = "'" + req.body.password.replace("'", "''") + "'";
	var email = "'" + req.body.email.replace("'", "''") + "'";

	const saltRounds = 10;
	bcrypt.genSalt(saltRounds, function (err, salt) {
			bcrypt.hash(password, salt, function (err, hash) {

					var query = "UPDATE Bary " +
							"SET nazwa_baru = " + bar_name + ", telefon = " + telephone + ", miasto = " + city + ", ulica = " + street
							+ ", numer_budynku = " + building_number + ", numer_lokalu = " + local_number + ", haslo = '" + hash +
							"', email = " + email +
							" WHERE id_baru = '" + req.user.barID + "'";


					console.log("Wyslano update do bazy danych: " + query);
					dbconn.query(query, function (err, rows) {
							console.log(err);

							get_bar_data(req.user.barID)
									.then(function (row) {

											if (err) res.render('edit_bar', {
													page: getPageVariable(req),
													title: "Edycja baru",
													type: 'ERROR',
													msg: "Ten e-mail już jest zajęty",
													bar: null
											});
											else res.render('edit_bar', {
													page: getPageVariable(req),
													title: "Edycja baru",
													type: 'SUCCESS',
													msg: "Pomyślnie zmieniono konto.",
													bar: row
											});
									})

					});
			});
	});
});

router.get('/delete_bar', function (req, res, next) {
	if (! req.isAuthenticated()){
			res.redirect('/');
	}
	res.render('delete_bar', {page: 'main', title: 'Usuń bar'});
});


router.post('/delete_bar', function (req, res, next) {
	var query = "DELETE FROM Bary WHERE id_baru = '" + req.user.barID + "'";
	dbconn.query(query, function (err, rows) {
			console.log(err);
			req.logout();
			res.redirect('/');

	})

});

module.exports = {
  router: router,
  printUserData: printUserData,
  getPageVariable: getPageVariable
};

router.get('/about/match/:id', function (req, res, next) {
    match_id = req.params.id;
    console.log(req.body.search_text);
    query = "SELECT t1.id_baru, t1.id_meczu, t2.nazwa_baru, t2.miasto, t2.ulica, t2.numer_budynku, t2.numer_lokalu\n" +
        "FROM Zespolowe.Bary_Z_Meczami t1, Zespolowe.Bary t2\n" +
        "WHERE t1.id_meczu = 1\n" +
        "AND t1.id_baru = t2.id_baru;";
    dbconn.query(query, function (err, rows) {
        if (err) res.render('search_match_result', {page: 'main', title: err, desc: err.msg});
        else {
            res.render('about_match', {page: 'main', title: 'Gdzie rozgrywany jest mecz', args: rows});
        }
    });
});

const moment = require('moment');

router.get('/match_schedule', function (req, res, next) {
    var orderBy = 'czas';
    if (req.query.orderBy) {
        orderBy = req.query.orderBy;
    }

    if (orderBy == 'nazwa_baru' || orderBy == 'miasto' ) {



        dbconn.query(
            "SELECT b.nazwa_baru, m.id_druzyna1, m.id_druzyna2, bzm.czas, b.miasto FROM (( Bary_Z_Meczami  as bzm LEFT JOIN Bary  as b ON bzm.id_baru = b.id_baru) LEFT JOIN Mecze as m ON bzm.id_meczu = m.id_meczu ) ORDER BY b." + orderBy,
            function (err, result) {
                const emptyArray = [];
                if (result === undefined) {
                    res.render('match_schedule', {
                        page: 'match_schedule',
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
                                var name = 'Wisla';

                                for (var i = 0; i < teams.length; i++) {
                                    if (teams[i].id_druzyny == id) {
                                        return teams[i].nazwa_druzyny;
                                    }
                                }
                                return name;
                            }

                            result.map(function(singleResult) {
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
                                page: 'main',
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
                        page: 'match_schedule',
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
                                var name = 'Wisla';

                                for (var i = 0; i < teams.length; i++) {
                                    if (teams[i].id_druzyny == id) {
                                        return teams[i].nazwa_druzyny;
                                    }
                                }
                                return name;
                            }

                            result.map(function(singleResult) {
                                const match = {
                                    nazwa_baru: singleResult.nazwa_baru,
                                    czas: singleResult.czas,
                                    druzyna1: getTeamName(singleResult.id_druzyna1),
                                    druzyna2: getTeamName(singleResult.id_druzyna2),
                                    miasto: singleResult.miasto
                                };
                                matches.push(match);
                            });


                            matches.sort(function(a, b) {
                                return a.druzyna1.localeCompare(b.druzyna1);
                            });

                            res.render('match_schedule', {
                                page: 'main',
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
                        page: 'match_schedule',
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
                                var name = 'Wisla';

                                for (var i = 0; i < teams.length; i++) {
                                    if (teams[i].id_druzyny == id) {
                                        return teams[i].nazwa_druzyny;
                                    }
                                }
                                return name;
                            }

                            result.map(function(singleResult) {
                                const match = {
                                    nazwa_baru: singleResult.nazwa_baru,
                                    czas: singleResult.czas,
                                    druzyna1: getTeamName(singleResult.id_druzyna1),
                                    druzyna2: getTeamName(singleResult.id_druzyna2),
                                    miasto: singleResult.miasto
                                };
                                matches.push(match);
                            });


                            matches.sort(function(a, b) {
                                return a.druzyna2.localeCompare(b.druzyna2);
                            });

                            res.render('match_schedule', {
                                page: 'main',
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
                        page: 'main',
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
                                var name = 'Wisla';

                                for (var i = 0; i < teams.length; i++) {
                                    if (teams[i].id_druzyny == id) {
                                        return teams[i].nazwa_druzyny;
                                    }
                                }
                                return name;
                            }

                            result.map(function(singleResult) {
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
                                page: 'main',
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