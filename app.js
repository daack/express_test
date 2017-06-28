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

// This will configure Passport to use Auth0
var strategy = new Auth0Strategy({
	domain:       process.env.AUTH0_DOMAIN,
	clientID:     process.env.AUTH0_CLIENT_ID,
	clientSecret: process.env.AUTH0_CLIENT_SECRET,
	callbackURL:  process.env.AUTH0_LOGIN_CALLBACK
}, function(accessToken, refreshToken, extraParams, user, done) {
	// profile has all the information from the user
	return done(null, user._json);
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

// We are also adding passport to our middleware flow
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
	if (!req.user)
		return res.redirect('/');

	next();
});

//GENERIC ROUTES
var index = require('./routes/index');
var dashboard = require('./routes/dashboard');

// ROUTES CIBO
var cibo = require('./routes/cibo');
var users = require('./routes/users');

app.use('/', index);
app.use('/dashboard', dashboard);
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
