var express = require('express');
var router = express.Router();
const session = require('express-session');
/*
passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!user.verifyPassword(password)) { return done(null, false); }
      return done(null, user);
    });
  }
));*/




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
    if(err) res.render('register_bar', { page: 'main', title: err, desc: err.msg });
    else res.render('register_bar', { page: 'main', title: "Pomyślnie utworzono konto" });
  });
  
})

router.get('/login_bar', function(req, res, next)
{
  res.render('login_bar', { page: 'main', title: 'Logowanie baru' });
});

//router.get('/login_user', function(req, res, next)
//{
//  res.render('login_user', { page: 'main', title: 'Logowanie użytkownika' });
//});

router.post('/login_bar', function(req, res, next)
{
  //TODO: escape '

  var password = req.body.password;
  var email = req.body.email;
  var query = "select * from Bary where  email = " + " '" + email + "' and haslo= '" + password + "';";

  console.log("Wyslano zapytani do bazy danych: " + query);

  dbconn.query(query, function(err, rows)
  {
    if(err) res.render('login_bar', { page: 'main', title: err, desc: err.msg });
    else {
		req.session.uid = rows[0].id_baru;
		res.render('login_bar', { page: 'main', title: "Pomyślnie zalogowany bar" });  		
	 }
  });
  
})


/*router.post('/login_user', function(req, res, next)
{
  //TODO: escape '

  var password = req.body.password;
  var email = req.body.email;
  var query = "select * from Uzytkownicy where  email = " + " '" + email + "' and haslo= '" + password + "';";

  console.log("Wyslano zapytani do bazy danych: " + query);

  dbconn.query(query, function(err, rows)
  {
    if(err) res.render('login_user', { page: 'main', title: err, desc: err.msg });
    else res.render('login_user', { page: 'main', title: "Pomyślnie zalogowany uzytkownik" });
  });
  
})*/

module.exports = router;
