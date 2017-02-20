var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
require('dotenv').config()

var app = express();
var mongoose = require('mongoose');

mongoose.connect('mongodb://'+process.env.DB_HOST+'/'+process.env.DB_NAME);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Connected to DB: "+ process.env.DB_NAME);
});

//DB MODELS
var tweetSchema = mongoose.Schema({
    'Tweet Id': String,
    'Date':Date,
    'Hour': String,
    'User Name':String,
    'Nickname':String,
    'Bio':String,
    'Tweet Content':String,
    'Favs':String,
    'RTs':String,
    'Latitude':String,
    'Longitude':String,
    'Country':String,
    'Place (as appears on Bio)':String,
    'Profile picture':String,
    'Followers':Number,
    'Following':Number,
    'Listed':Number,
    'Tweet language (ISO 639-1)':String,
    'Tweet Url':String,
    'Is a RT':Boolean,
    'Original Tweet User Name':String,
    'User Mentions':String,
    'Hashtags':String,
    'Symbols':String,
    'Media':String,
    'URLs':String
});

var Tweet = mongoose.model('Tweet', tweetSchema,process.env.DB_COLLECTION);

//example query
Tweet.find({_id:"5898a6776595d757dddf7040"}, function (err, docs) {
    // docs.forEach
    docs.forEach(function(doc){
        // must grab object variables with ['key name'] because he is a jerk and put in spaces and captial letters.
       console.log(doc['User Name']);
    });
});


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

app.use('/', index);
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
