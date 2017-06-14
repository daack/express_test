require('dotenv').config();

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var nunjucks = require('nunjucks');
var passport = require('passport');
var Auth0Strategy = require('passport-auth0');

var index = require('./routes/index');
var auth = require('./routes/auth');

// ROUTES CIBO
var cibo = require('./routes/cibo');
var users = require('./routes/users');

// This will configure Passport to use Auth0
var strategy = new Auth0Strategy({
	domain:       process.env.AUTH0_DOMAIN,
	clientID:     process.env.AUTH0_CLIENT_ID,
	clientSecret: process.env.AUTH0_CLIENT_SECRET,
	callbackURL:  'http://localhost:3000/callback'
}, function(accessToken, refreshToken, extraParams, profile, done) {
	// profile has all the information from the user
	return done(null, profile);
});

// Here we are adding the Auth0 Strategy to our passport framework
passport.use(strategy);

// The searlize and deserialize user methods will allow us to get the user data once they are logged in.
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));

nunjucks.configure('views', {
    autoescape: true,
    express: app
});
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: 'supercat', saveUninitialized: true, resave: true}));

// We are also adding passport to our middleware flow
app.use(passport.initialize());
app.use(passport.session());

// Session-persisted message middleware
app.use(function(req, res, next){
	var err = req.session.error,
		msg = req.session.notice,
		win = req.session.success;
		log = req.session.logged;

	delete req.session.error;
	delete req.session.success;
	delete req.session.notice;
	delete req.session.logged;

	if (err) res.locals.error = err;
	if (msg) res.locals.notice = msg;
	if (win) res.locals.success = win;
	if (log) app.locals.logged = log;

	next();
});

app.use('/', index);
app.use('/auth', auth);
app.use('/cibo', cibo);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
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
