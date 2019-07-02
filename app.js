const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const vhost = require('vhost')
const mongoose = require('mongoose')

const indexRouter = require('./routes/index')

const api = require('./API')

const app = express()

mongoose.connect('mongodb://localhost:27017/myapp', { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true })
    .then(() => {
        console.log('You are now connected !')
    })
    .catch((err) => {
        console.log('Something went wrong', err)
    })

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser('PSZg88X]cu;U`vs<'))


app.use(vhost('api.myapp', api))

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

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