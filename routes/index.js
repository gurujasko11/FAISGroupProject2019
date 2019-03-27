var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { page: 'main', title: 'Express' });
});

router.get('/exp1', function(req, res, next) {
  res.render('index', { page: 'main', title: 'Express1' });
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

module.exports = router;
