const createError = require('http-errors');
const express = require('express');
const bodyParser = require('body-parser');
const  path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/routes');
//const usersRouter = require('./routes/users');

// setup our server
const http = require('http');
const app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Models
const models = require("./models");

//sync Database
models.sequelize.sync().then(function () {
    console.log('Nice!');
}).catch(function (err) {
  console.log(err,' something went wrong!');

});
/*app.use(express.json());
app.use(express.urlencoded({ extended: false }));*/
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//Routes
app.use('/', indexRouter);
app.use('/employee', indexRouter);
app.use('/list', indexRouter);
app.use('/dashboard', indexRouter);
app.use('/edit', indexRouter);
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

const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);
const server = http.createServer(app);
server.listen(port);

module.exports = app;
