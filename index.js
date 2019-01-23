

const express = require("express");
const app = express();
app.set("views","./views");
app.set('view engine', 'ejs');
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
  var bodyParser = require('body-parser');
  app.use(bodyParser.urlencoded({ extended: true }))

const session = require('express-session');

const flash = require('connect-flash');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Tasks',{useNewUrlParser: true});

const routeTask = require('./routes/task.route');
const routeIndex = require('./routes/index.route');
const routeUser = require('./routes/user.route');
const user = require('./models/user.model');

app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('public'));


app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');

  res.locals.user = req.user || '';
  next();
});

app.use('/task', routeTask);

app.use('/',routeIndex);

app.use('/user', routeUser);



app.listen(3000, () => console.log("connected"));