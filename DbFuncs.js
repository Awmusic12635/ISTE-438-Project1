require('dotenv').config()
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
    'URLs':String.
	'comment':[String]
});

// connection to the database
var dbconn = mongoose.model('Tweet', tweetSchema,process.env.DB_COLLECTION);

// callback gets passed an array of documents
function queryDb(dbconn, value, callback){
	dbconn.find(value, function (err, docs) {
		var listOfDocs = [];
		docs.forEach(function(doc){
		   listOfDocs.push(doc);
		});
	   callback(listOfDocs);
	});
}