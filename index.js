var express = require('express');
var router = express.Router();
const session = require('express-session');
var passport = require('passport');
const LocalStrategy = require('passport-local');
var flash = require('connect-flash');
const bcrypt = require('bcrypt');

const nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'zespolowe.fais@gmail.com',
    pass: 'alama100$'
  }
});

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback : true
},
function(req, username, password, done) {
  username = req.body.email.replace("'", "''");
  password = req.body.password.replace("'", "''");
  tableName = getTableNameFrom(req.body.user.replace("'", "''"));
  if(!username || !password ) { console.log("username/password not given: "); console.log(username); console.log(password); return done(null, false); }
  dbconn.query("select * from " + tableName + " where email = '"+ username+"'", function(err, rows) {
    if (err) return done(null, false, req.flash('FLASH_MSG', ['SQL ERROR', err]));
              if(!rows.length){ return done(null, false, req.flash('FLASH_MSG', ['ERROR', 'Użytkownik z takim e-mailem nie istnieje'])); }
              
              
              var encPassword = password;
    var dbPassword  = rows[0].haslo;
    bcrypt.compare(encPassword, dbPassword, function(err, res) {
      if(res) {
        if(tableName == 'Uzytkownicy')
          return done(null, { userID: rows[0].id_uzytkownika, first_name: rows[0].imie, last_name: rows[0].nazwisko, email: rows[0].email, type: req.body.user });
        else if(tableName == 'Bary')
          return done(null, { barID: rows[0].id_baru, bar_name: rows[0].nazwa_baru, telephone: rows[0].telefon, town: rows[0].miasto, 
            street: rows[0].ulica, building_number: rows[0].numer_budynku, local_number: rows[0].numer_lokalu, type: req.body.user });
          else
            return done(null, rows[0]);
      } else {
        return done(null, false, req.flash('FLASH_MSG', ['ERROR', 'Niepoprawne hasło']));
      } 
    });
  });
}
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { page: getPageVariable(req), title: 'MatchBar', flash_messages: req.flash('FLASH_MSG') });
});

router.get('/dev', function(req, res, next) {
  res.render('template', { page: getPageVariable(req), title: 'CSS Test' });
});

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
              + '<br>Bests, <br>Project team'
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


router.get('/rozgrywki', function(req, res, next) {
  res.render('wip', { page: getPageVariable(req), title: 'Rozgrywki' });
});
router.get('/about', function(req, res, next) {
  res.render('about', { page: getPageVariable(req), title: 'O stronie' });
});

router.get('/register_bar', function(req, res, next)
{
  if(req.isAuthenticated())
  {
    req.flash('FLASH_MSG', ['INFO', 'Jesteś już zalogowany']);
    res.redirect('/');
  }
  else
    res.render('register_bar', { page: getPageVariable(req), title: 'Rejestracja baru' });
});

router.post('/register_bar', function(req, res, next)
{
  var bar_name = req.body.bar_name.replace("'", "''");
  var telephone = req.body.telephone.replace("'", "''");
  var city = req.body.city.replace("'", "''");
  var street = req.body.street.replace("'", "''");
  var building_number = req.body.building_number.replace("'", "''");
  var local_number = req.body.local_number.replace("'", "''");
  var password = req.body.password.replace("'", "''");
  var email = req.body.email.replace("'", "''");
  
  
  validateCityInDB(city).then(function(value) {
    isEmailAvailable(email, 'Bary').then(function(value) {
      addBarToDB(password, bar_name, telephone, city, street, building_number, local_number, email, res, req);
    }, (reason) => { //email jest zajety/zapytanie o email sie nie powiodlo
      if(typeof(reason) === 'undefined') //nigdy nie powinno do tego wejsc
      {
        console.log("[/register_bar.isEmailAvailable] UNDEFINED REASON");
        res.render('register_bar', { page: getPageVariable(req), title: "Rejestracja baru", type: 'ERROR', msg: "Przepraszamy, wystąpił błąd po stronie serwera" });
      }
      else if(reason == 1) res.render('register_bar', { page: getPageVariable(req), title: "Rejestracja baru", type: 'ERROR', msg: "Ten e-mail już jest zajęty" });
                                        else
                                        {
                                          console.log("[/register_bar.isEmailAvailable] SQL_ERROR: " + reason);
                                          res.render('register_bar', { page: getPageVariable(req), title: "Rejestracja baru", type: 'ERROR', msg: "Przepraszamy, wystąpił błąd po stronie serwera" });
                                        }
    });
  }, (reason) => {//dodanie miasta sie nie powiodlo
    console.log("[/register_bar.validateCityInDB] SQL_ERROR: " + reason);
    res.render('register_bar', { page: getPageVariable(req), title: "Rejestracja baru", type: 'ERROR', msg: "Przepraszamy, wystąpił błąd po stronie serwera" });
    return;
  });
});

router.get('/register_user', function(req, res, next)
{
  if(req.isAuthenticated())
  {
    req.flash('FLASH_MSG', ['INFO', 'Jesteś już zalogowany']);
    res.redirect('/');
  }
  else
    res.render('register_user', { page: getPageVariable(req), title: 'Rejestracja użytkownika' });
});

router.post('/register_user', function(req, res, next)
{
  var telephone = req.body.telephone.replace("'", "''");
  var password = req.body.password.replace("'", "''");
  var email = req.body.email.replace("'", "''");
  var first_name = req.body.first_name.replace("'", "''");
  var last_name = req.body.last_name.replace("'", "''");
  if(telephone == '') telephone = 'NULL';
            if(first_name == '') first_name = 'NULL';
            if(last_name == '') last_name = 'NULL';
            
            
            isEmailAvailable(email, 'Uzytkownicy').then(function(value) {
              addUserToDB(password, first_name, last_name, email, telephone, res, req);
            }, (reason) => {
              res.render('register_user', { page: getPageVariable(req), title: 'Rejestracja użytkownika', type: 'ERROR', msg: "Ten e-mail jest już zajęty" });
              if(typeof(reason) === 'undefined') //nigdy nie powinno do tego wejsc
              {
                console.log("[/register_user.isEmailAvailable] UNDEFINED REASON");
                res.render('register_user', { page: getPageVariable(req), title: "Rejestracja użytkownika", type: 'ERROR', msg: "Przepraszamy, wystąpił błąd po stronie serwera" });
              }
              else if(reason == 1) res.render('register_user', { page: getPageVariable(req), title: "Rejestracja użytkownika", type: 'ERROR', msg: "Ten e-mail już jest zajęty" });
                                                        else
                                                        {
                                                          console.log("[/register_user.isEmailAvailable] SQL_ERROR: " + reason);
                                                          res.render('register_user', { page: getPageVariable(req), title: "Rejestracja użytkownika", type: 'ERROR', msg: "Przepraszamy, wystąpił błąd po stronie serwera" });
                                                        }
            });
            console.log("pas:", password);
            
});

router.get('/login', function(req, res, next) {
  if(req.isAuthenticated())
  {
    req.flash('FLASH_MSG', ['INFO', 'Jesteś już zalogowany']);
    res.redirect('/');
  }
  else
    res.render('login', { page: getPageVariable(req), title: 'Logowanie', flash_messages: req.flash('FLASH_MSG') });
});

router.post('/login', 
            passport.authenticate('local', { failureRedirect: '/login', failureFlash : true}),
            function(req, res, next) {
              req.flash('FLASH_MSG', ['SUCCESS', 'Zalogowano pomyślnie']);
              res.redirect('/');
            });

router.get('/logout', function(req, res)
{
  if(!req.isAuthenticated())
  {
    req.flash("FLASH_MSG", ['INFO', 'Nie można wylogować osoby, która nie jest zalogowana']);
    res.redirect('/login');
  }
  else
  {
    req.logout();
    req.flash('FLASH_MSG', ['INFO', 'Wylogowano pomyślnie']);
    res.redirect('/');
  }
});

router.get('/test', function(req, res)
{
  console.log("[/TEST] Zalogowany? " + req.isAuthenticated());
  if(req.isAuthenticated()) console.log("[/TEST] req.user = " + JSON.stringify(req.user, null, 3));
          res.redirect('/');
});


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
          res.render('register_user', { page: getPageVariable(req), title: 'Rejestracja użytkownika', type: 'ERROR', msg: "Przepraszamy, wystąpił błąd po stronie serwera" });
        }
        else
          res.render('register_user', { page: getPageVariable(req), title: "Rejestracja użytkownika", type: 'SUCCESS', msg: 'Pomyślnie utworzono konto.' });
      });
    });
  });
}

function getPageVariable(req)
{
  if(req.isAuthenticated())
    return "authenticated";
  else
    return "main";
}

function validateCityInDB(city)
{
  return new Promise(function(resolve, reject) {
    dbconn.query("select * from Miasta where miasto = '" + city + "'", function(err, rows) {
      if(err) { console.log("[validateCityInDB] query: " + "select * from Miasta where miasto = '" + city + "'" + "\n --> ERR: " + err); reject(err); return; }
      if(!rows.length)
      { 
        dbconn.query("insert into Miasta (miasto) values ('" + city + "')", function(err, rows) 
        {
          if(err)
          {
            console.log("[validateCityInDB] query: " + "insert into Miasta (miasto) values ('" + city + "')" + "\n --> ERR: " + err);
            reject(err);
          }
        });
      }
      resolve();
    });
  });
}

function isEmailAvailable(email, tableNameInDB)
{
  return new Promise(function(resolve, reject) {
    dbconn.query("select * from " + tableNameInDB + " where email = '"+ email + "'", function(err, rows) {
      if(err)
      {
        console.log("[isEmailAvailable] query: " + "select * from " + tableNameInDB + " where email = '"+ email + "';" + "\n --> ERR: " + err);
        reject(err);
      } 
      if(rows.length >= 1) reject(rows.length);
                else resolve();
    });
  });
}

function getTableNameFrom(user) //returns table name
{
  if(user == 'user')
    return 'Uzytkownicy';
  else
    return 'Bary';
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
          res.render('register_bar', { page: getPageVariable(req), title: "Rejestracja baru", type: 'ERROR', msg: "Przepraszamy, wystąpił błąd po stronie serwera" });
        }
        else
          res.render('register_bar', { page: getPageVariable(req), title: "Rejestracja baru", type: 'SUCCESS', msg: "Pomyślnie utworzono konto." });
      });
    });
  });
}


module.exports = router;

