require('dotenv').config()
const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const vhost = require('vhost')
const mongoose = require('mongoose')
const sassMiddleware = require('node-sass-middleware')

const indexRouter = require('./routes/index')
const editConfigRouter = require('./routes/edit-config')

const api = require('./API')

const app = express()

const environment = process.env.NODE_ENV

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

let value = true
let style = 'expanded'
if (environment == 'production') {
    let value = false
    let style = 'compressed'
}
value = false
    // middleware to compile scss
app.use('/stylesheets', sassMiddleware({
    src: path.join(__dirname, 'sass'),
    dest: path.join(__dirname, 'public/stylesheets'),
    indentedSyntax: false,
    // true = .sass and false = .scss
    outputStyle: style,
    sourceMap: value
}))


app.use(vhost('api.myapp', api))

app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/edit-config', editConfigRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404))
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