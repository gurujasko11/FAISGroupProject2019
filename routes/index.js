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

router.get('/bar_home', function(req, res, next)
{
  res.render('bar_home', { page: 'main', title: 'Moje mecze' });
});

router.get('/add_match', function(req, res, next)
{
  res.render('add_match', { page: 'main', title: 'Dodaj mecz' });
});

router.get('/account', function(req, res, next)
{
  res.render('account', { page: 'main', title: 'Konto' });
});

router.post('/search_match', function(req, res, next)
{
  console.log(req.body.search_text)
  teams = req.body.search_text.split(',')
  query = "SELECT czas, t1.nazwa_druzyny as home, t2.nazwa_druzyny as away\n" +
      "  FROM Zespolowe.Mecze m, Zespolowe.Druzyny t1, Zespolowe.Druzyny t2 \n" +
      " WHERE m.id_druzyna1 = t1.id_druzyny\n" +
      "   AND m.id_druzyna2 = t2.id_druzyny" +
      "   AND t1.nazwa_druzyny = \'" + teams[0] +
      "\'   AND t2.nazwa_druzyny = \'" + teams[1] + "\'"
  dbconn.query(query, function(err, rows)
  {
    if(err)  res.render('search_match_result', { page: 'main', title: err, desc: err.msg });
    else {
      res.render('search_match_result', { page: 'main', title: 'Wyniki wyszukiwania', args : rows});
    }
  });
})

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

router.get('/bar_login', function(req, res, next)
{

  app.use(session({
    secret: '343ji43j4n3jn4jk3n'
  }));
  res.redirect('/');
});

module.exports = router;
