var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('localhost', 'gettingstarted');

var routes = require('./routes/index');
var users = require('./routes/users');
var search = require('./routes/search');
var ratings = require('./routes/ratings');
var restaurants = require('./routes/restaurants');
var addUser = require('./routes/addUser');
var addRestaurant = require('./routes/addRestaurant');
var addRating = require('./routes/addRating');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// GET routes
app.use('/', routes);
app.use('/users', users);
app.use('/search', search);
app.use('/ratings', ratings);
app.use('/restaurants', restaurants);

// POST routes
app.use('/addUser', addUser);
app.use('/addRestaurant', addRestaurant);
app.use('/addRating', addRating);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;