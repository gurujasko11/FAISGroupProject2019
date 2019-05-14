var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { page: getPageVariable(req), title: 'MatchBar', flash_messages: req.flash('FLASH_MSG') });
});

router.get('/dev', function(req, res, next) {
  res.render('template', { page: getPageVariable(req), title: 'CSS Test' });
});

// router.get('/match', function(req, res, next) {
//   res.render('wip', { page: getPageVariable(req), title: 'Rozgrywki' });
// });

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
  query = "SELECT czas, id_meczu, t1.nazwa_druzyny as home, t2.nazwa_druzyny as away\n" +
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

router.get('/teams', function(req, res, next) {

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

module.exports = {
  router: router,
  printUserData: printUserData,
  getPageVariable: getPageVariable
};


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
})