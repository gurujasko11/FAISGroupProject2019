var express = require('express');
var router = express.Router();
const session = require('express-session');
var passport = require('passport');
const LocalStrategy = require('passport-local');

router.use(passport.initialize());
router.use(passport.session());

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
},
function(username, password, done) {
  console.log(username);
  console.log(password);
  if(!username || !password ) { console.log("username/password not given: "); console.log(username); console.log(password); return done(null, false); }
  dbconn.query("select * from Uzytkownicy where email = '"+ username+"'", function(err, rows){
      console.log(err); console.log(rows);
      if (err) return done(req.flash('message',err));
      if(!rows.length){ return done(null, false); }

      var encPassword = password;
      var dbPassword  = rows[0].haslo;
      if(!(dbPassword == encPassword)){
          return done(null, false);
        }
      return done(null, rows[0]);
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
  res.render('index', { page: 'main', title: 'MatchBar' });
});

router.get('/dev', function(req, res, next) {
  res.render('template', { page: 'main', title: 'CSS Test' });
});


router.get('/rozgrywki', function(req, res, next) {
  res.render('wip', { page: 'main', title: 'Rozgrywki' });
});
router.get('/about', function(req, res, next) {
  res.render('about', { page: 'main', title: 'O stronie' });
});

router.get('/register_bar', function(req, res, next)
{
  res.render('register_bar', { page: 'main', title: 'Rejestracja baru' });
});

router.post('/register_bar', function(req, res, next)
{
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
  dbconn.query(query, function(err, rows)
  {
    if(err) res.render('register_bar', { page: 'main', title: "Rejestracja baru!", type: 'ERROR', msg: err.message });
    else res.render('register_bar', { page: 'main', title: "Rejestracja baru", type: 'SUCCESS', msg: "Pomyślnie utworzono konto." });
  });
});

router.get('/register_user', function(req, res, next)
{
  res.render('register_user', { page: 'main', title: 'Rejestracja użytkownika' });
});

router.post('/register_user', function(req, res, next)
{
  //TODO: escape '
  var first_name = req.body.first_name;
  var last_name = req.body.last_name;
  var telephone = req.body.telephone;
  var password = req.body.password;
  var email = req.body.email;
  if(telephone == '') telephone = 'NULL';
  var query = "insert into Uzytkownicy (imie, nazwisko, email, telefon, haslo) values " +
              "('" + first_name + "', '" + last_name + "', '" + email + "', '" + telephone + "', '" + password + "');";

  console.log("Wyslano insert do bazy danych: " + query);
  dbconn.query(query, function(err, rows)
  {
    if(err) res.render('register_user', { page: 'main', title: 'Rejestracja użytkownika', type: 'ERROR', msg: err.message });
    else res.render('register_user', { page: 'main', title: "Rejestracja użytkownika", type: 'SUCCESS', msg: 'Pomyślnie utworzono konto.' });
  });
});


router.get('/login', function(req, res, next) {
  res.render('login', { page: 'main', title: 'Logowanie' });
});

router.post('/login', 
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

module.exports = router;
