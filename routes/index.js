var express = require('express');
var router = express.Router();
const session = require('express-session');
var passport = require('passport');
const LocalStrategy = require('passport-local');
var flash = require('connect-flash');


passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback : true
},
  function(req, username, password, done) {
    username = username.replace("'", "''");
    password = password.replace("'", "''");
    console.log(username);
    console.log(password);
    if(!username || !password ) { console.log("username/password not given: "); console.log(username); console.log(password); return done(null, false); }
      dbconn.query("select * from Uzytkownicy where email = '"+ username+"'", function(err, rows){
      console.log(err); console.log(rows);
      if (err) return done(null, false, req.flash('FLASH_MSG', ['SQL ERROR', err]));
      if(!rows.length){ return done(null, false, req.flash('FLASH_MSG', ['ERROR', 'Użytkownik z takim e-mailem nie istnieje'])); }

      var encPassword = password;
      var dbPassword  = rows[0].haslo;
      if(!(dbPassword == encPassword)){
        return done(null, false, req.flash('FLASH_MSG', ['ERROR', 'Niepoprawne hasło']));
      }
      return done(null, { userID: rows[0].id_uzytkownika, first_name: rows[0].imie, last_name: rows[0].nazwisko, email: rows[0].email });
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

function getPageVariable(req)
{
  if(req.isAuthenticated())
    return "authenticated";
  else
    return "main";
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { page: getPageVariable(req), title: 'MatchBar', flash_messages: req.flash('FLASH_MSG') });
});

router.get('/dev', function(req, res, next) {
  res.render('template', { page: getPageVariable(req), title: 'CSS Test' });
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
  var query = "insert into Bary (nazwa_baru, telefon, miasto, ulica, numer_budynku, numer_lokalu, haslo, email) values " +
              "('" + bar_name + "', '" + telephone + "', '" + city + "', '" + street + "', '" + building_number + "', '" + local_number + "', '" + password + "', '" + email + "');";

  console.log("Wyslano insert do bazy danych: " + query);
  dbconn.query(query, function(err, rows)
  {
    if(err) res.render('register_bar', { page: getPageVariable(req), title: "Rejestracja baru", type: 'ERROR', msg: err.message });
    else res.render('register_bar', { page: getPageVariable(req), title: "Rejestracja baru", type: 'SUCCESS', msg: "Pomyślnie utworzono konto." });
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
  var first_name = req.body.first_name.replace("'", "''");
  var last_name = req.body.last_name.replace("'", "''");
  var telephone = req.body.telephone.replace("'", "''");
  var password = req.body.password.replace("'", "''");
  var email = req.body.email.replace("'", "''");
  if(telephone == '') telephone = 'NULL';
  var query = "insert into Uzytkownicy (imie, nazwisko, email, telefon, haslo) values " +
              "('" + first_name + "', '" + last_name + "', '" + email + "', '" + telephone + "', '" + password + "');";

  console.log("Wyslano insert do bazy danych: " + query);
  dbconn.query(query, function(err, rows)
  {
    if(err) res.render('register_user', { page: getPageVariable(req), title: 'Rejestracja użytkownika', type: 'ERROR', msg: err.message });
    else res.render('register_user', { page: getPageVariable(req), title: "Rejestracja użytkownika", type: 'SUCCESS', msg: 'Pomyślnie utworzono konto.' });
  });
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
  req.logout();
  req.flash('FLASH_MSG', ['INFO', 'Wylogowano pomyślnie']);
  res.redirect('/');
});

router.get('/test', function(req, res)
{
  console.log(req.isAuthenticated());
  res.redirect('/');
});

module.exports = router;
