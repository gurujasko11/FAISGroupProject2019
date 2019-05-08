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

    dbconn.query('SELECT * FROM Druzyny', function(err, result) {

        if(err){
            throw err;
        } else {
            obj = {print: result, page: getPageVariable(req),title: 'teams'};
            res.render('teams', obj);                
        }
    });

  //res.render('teams', { page: getPageVariable(req), title: 'teams' });
});

router.post('/observe', function(req, res, next) {
  var id_druzyny = req.body.id_druzyn;
  var checkbox = req.body.observation;

  res.redirect('/');
});

module.exports = {
  router: router,
  printUserData: printUserData,
  getPageVariable: getPageVariable
};
