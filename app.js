var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

//var passport = require('passport');
//var session = require('express-session');

var flash             = require('connect-flash');
var crypto            = require('crypto');
var passport          = require('passport');
var LocalStrategy     = require('passport-local').Strategy;
var connection        = require('./lib/dbconn');
var sess              = require('express-session');
var Store             = require('express-session').Store;
     
var BetterMemoryStore = require('session-memory-store')(sess);


     var store = new BetterMemoryStore({ expires: 60 * 60 * 1000, debug: true });
     app.use(sess({
        name: 'JSESSION',
        secret: 'MYSECRETISVERYSECRET',
        store:  store,
        resave: true,
        saveUninitialized: true
    }));

    app.use(flash());
    app.use(passport.initialize());
    app.use(passport.session());

    passport.use('local', new LocalStrategy({
      usernameField: 'email',
      passwordField: 'haslo',
      passReqToCallback: true 
    } , function (req, email, haslo, done){
          if(!username || !password ) { return done(null, false, req.flash('message','All fields are required.')); }
	
	
          connection.query("select * from Uzytkownicy where email = '"+ email+"'", function(err, rows){
              console.log(err); console.log(rows);
            if (err) return done(req.flash('message',err));
            if(!rows.length){ return done(null, false, req.flash('message','Invalid username or password.')); }

	    var encPassword = haslo;
            var dbPassword  = rows[0].haslo;
            if(!(dbPassword == encPassword)){
                return done(null, false, req.flash('message','Invalid username or password.'));
             }
            return done(null, rows[0]);
          });
        }
    ));

    passport.serializeUser(function(user, done){
        done(null, user.id_uzytkownika);
    });
    passport.deserializeUser(function(id_uzytkownika, done){
        connection.query("select * from Uzytkownicy where id_uzytkownika = "+ id_uzytkownika, function (err, rows){
            done(err, rows[0]);
        });
    });

    app.get('/login_user', function(req, res){
      res.render('login_user',{page: 'main', title: 'Logowanie użytkownika','message' :req.flash('message')});
    });


    app.post("/login_user", passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/rozgrywki',
        failureFlash: true
    }), function(req, res, info){
        res.render('/login_user',{'message' :req.flash('message')});
    });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

//require mysql
var mysql = require('mysql');
dbconn = mysql.createConnection({
	user: 'root',
	password: '12345',
	database: 'Zespolowe'
});
dbconn.connect();

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
