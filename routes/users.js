var express = require('express');
var router = express.Router();
var indexModule = require('./index');
var getPageVariable = indexModule.getPageVariable;
var authenticationModule = require('./authentication');
var AuthenticatedUserOnly = authenticationModule.authenticatedUserOnly;
/* GET users listing. */
//router.get('/', function (req, res, next) {
 // res.send('respond with a resource');
//});

router.get('/obserwowane', AuthenticatedUserOnly,  function(req, res, next) {

  dbconn.query('  select Druzyny.id_druzyny, nazwa_druzyny, id_uzytkownika from Druzyny left join ( select * from Uzytkownik_Z_Druzynami where id_uzytkownika =' + req.user.userID + ') as Uzytkownik_Z_Druzynami  on Druzyny.id_druzyny = Uzytkownik_Z_Druzynami.id_druzyny' , function (err, result) {

    if (err) {
      throw err;
    } else {
      obj = {print: result, page: getPageVariable(req), title: 'Twoje obserwacje'};
      res.render('obserwowane', obj);
    }
  });

});

router.post('/zmien_obserwacje', AuthenticatedUserOnly, function (req, res, next) {

  var checked_elems = req.body.testcheck;
  var x = 1;

    if(checked_elems == null)
    {
      query = "delete from Uzytkownik_Z_Druzynami where id_uzytkownika =  " + req.user.userID;
      dbconn.query(query, function(err, rows)
      {
        if(err)  res.render('obserwowane', { page: 'main', title: err, desc: err.msg });
        else {
          //obj = {print: rows, page: getPageVariable(req), title: 'obserwowane'};
          res.redirect('/obserwowane');
        }
      });
    }
    else if (Array.isArray(checked_elems) )
    {

      query = "delete from Uzytkownik_Z_Druzynami where id_uzytkownika =  " + req.user.userID;
      dbconn.query(query, function(err, rows)
      {
        if(err)  res.render('obserwowane', { page: 'main', title: err, desc: err.msg });
        else {
          checked_elems.forEach(element => {
        
            query = "insert into Uzytkownik_Z_Druzynami values(  " + req.user.userID+","+element+")";
            dbconn.query(query, function(err, rows)
            {
              if(err)  console.log(err);

            });

          });
          res.redirect('/obserwowane');
        }
      });

    }
    else{

      query = "delete from Uzytkownik_Z_Druzynami where id_uzytkownika =  " + req.user.userID;
      dbconn.query(query, function(err, rows)
      {
        if(err)  res.render('obserwowane', { page: 'main', title: err, desc: err.msg });
        else {
          query = "insert into Uzytkownik_Z_Druzynami values(  " + req.user.userID+","+checked_elems+")";
            dbconn.query(query, function(err, rows)
            {
              if(err)  res.render('obserwowane', { page: 'main', title: err, desc: err.msg });
              else {
                //obj = {print: rows, page: getPageVariable(req), title: 'obserwowane'};
                res.redirect('obserwowane');
              }
            });
        }
      });

    }
});


module.exports = router;