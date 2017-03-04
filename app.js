// libraries
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// uses the .env file to create variables under the process.env object
require('dotenv').config();

// more libraries
var app = express();
var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

// connection string for mongoose to connect ot our database
mongoose.connect('mongodb://'+process.env.DB_HOST+'/'+process.env.DB_NAME);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// logs connection to the database
db.once('open', function() {
    console.log("Connected to DB: "+ process.env.DB_NAME);
});


// DB MODELS
// the schema value mongoose will use to interact with the database
var tweetSchema = mongoose.Schema({
    'Tweet Id': String,
    'Date':Date,
    'Hour': String,
    'User Name':String,
    'Nickname':String,
    'Bio':String,
    'Tweet content':String,
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
    'URLs':String,
    'Comments':[String]
});
tweetSchema.plugin(mongoosePaginate);
var Tweet = mongoose.model('Tweet', tweetSchema,process.env.DB_COLLECTION);

// set up for routing
var index = require('./routes/index');
var search = require('./routes/search');
var tweet = require('./routes/tweet');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// attach functions to record and interact with application functions
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// use the routes set up above and assign them to different uris
app.use('/', index);
app.use('/search', search);
app.use('/tweets', tweet);

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

// start the server listener
app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});


module.exports = app;
