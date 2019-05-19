var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var flash = require('connect-flash');
var crypto            = require('crypto');
var passport          = require('passport');
var LocalStrategy     = require('passport-local').Strategy;
var sess              = require('express-session');
var Store             = require('express-session').Store;
var BetterMemoryStore = require('session-memory-store')(sess);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var barsRouter = require('./routes/bars');
var matchesRouter = require('./routes/match');
var myAccountRouter = require('./routes/my_account');
var authenticationRouter = require('./routes/authentication');
var registrationRouter = require('./routes/registration');

var app = express();
const session = require('express-session');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
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

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter.router);
app.use('/users', usersRouter);
app.use('/match', matchesRouter);
app.use('/bars', barsRouter);
app.use('/', myAccountRouter);
app.use('/', authenticationRouter.router);
app.use('/', registrationRouter.router);

//require mysql
var mysql = require('mysql');
dbconn = mysql.createConnection({
	user: 'root',
	password: 'password',
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
