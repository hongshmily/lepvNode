var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

const properties = require('./properties.json');

var db = require('./db');

var argv = require('minimist')(process.argv.slice(2));

var index = require('./routes/index');
var cpuRouter = require('./routes/cpu');
var memoryRouter = require('./routes/memory');
var ioRouter = require('./routes/io');
var perfRouter = require('./routes/perf');

var commandRouter = require('./routes/command');
var testerRouter = require('./routes/test');

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
app.use(express.static(path.join(__dirname, 'bower_components')));
app.use(express.static(path.join(__dirname, 'node_components')));

app.use("/css",  express.static(__dirname + '/public/css'));
app.use("/js",  express.static(__dirname + '/public/js'));
app.use("/lib",  express.static(__dirname + '/public/lib'));
app.use("/font-awesome",  express.static(__dirname + '/public/font-awesome'));
app.use("/fonts",  express.static(__dirname + '/public/fonts'));
app.use("/images",  express.static(__dirname + '/public/images'));
app.use("/html",  express.static(__dirname + '/public/html'));
app.use("/components",  express.static(__dirname + '/public/components'));
app.use("/whhg-font",  express.static(__dirname + '/public/whhg-font'));
app.use("/swagger",  express.static(__dirname + '/public/components/swagger'));
app.use("/docs",  express.static(__dirname + '/public/docs'));

app.use("/bower",  express.static(__dirname + '/bower_components'));
app.use("/node",  express.static(__dirname + '/node_modules'));

app.use('/', index);
app.use('/cpu', cpuRouter);
app.use('/memory', memoryRouter);
app.use('/io', ioRouter);
app.use('/perf', perfRouter);

app.use('/command', commandRouter);
app.use('/test', testerRouter);


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

// Connect to Mongo on start
db.connect(properties.local_mongodb_address);
console.log("Mongo connected");

module.exports = app;
