var express = require('express');
var router = express.Router();
const session = require('express-session');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { page: 'main', title: 'MatchBar' });
});

router.get('/dev', function(req, res, next) {
  res.render('template', { page: 'main', title: 'CSS Test' });
});


router.get('/match', function(req, res, next) {
  res.render('match', { page: 'main', title: 'Rozgrywki' });
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

router.get('/bar_login', function(req, res, next)
{

    app.use(session({
        'secret': '343ji43j4n3jn4jk3n'}
    ));
    res.redirect('/');
});

module.exports = router;
