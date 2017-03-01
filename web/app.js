var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var jenkinsRouter = require('./routes/jenkins');
var qaCodeRouter = require('./routes/qacode');
var mongoRouter = require('./routes/mongo');
var reportRouter = require('./routes/report');

var db = require('./db');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
app.use("/css",  express.static(__dirname + '/public/css'));
app.use("/js",  express.static(__dirname + '/public/js'));
app.use("/data",  express.static(__dirname + '/public/data'));
app.use("/font-awesome",  express.static(__dirname + '/public/font-awesome'));
app.use("/fonts",  express.static(__dirname + '/public/fonts'));
app.use("/images",  express.static(__dirname + '/public/images'));

app.use('/', index);

app.use('/jenkins', jenkinsRouter);
app.use('/qacode', qaCodeRouter);
app.use('/mongo', mongoRouter);
app.use('/report', reportRouter);

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

// Connect to LepdCaller on start
db.connect('mongodb://10.14.0.40:27017/jenkinsresults', function(err) {
    if (err) {
        console.log('Unable to connect to LepdCaller.');
        process.exit(1)
    }
});

module.exports = app;
