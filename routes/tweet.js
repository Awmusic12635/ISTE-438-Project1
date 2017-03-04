// libraries
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
    , Tweet = mongoose.model('Tweet');

// renders a detailed view of a specfic tweet using a document from the mongo store	
router.get('/:tweetid', function(req, res, next) {
    Tweet.findOne({_id:req.params.tweetid}, function (err, doc) {
        res.render('details', { title: 'Tweet' ,tweet: doc});
     });
});

// renders the comment page
router.get('/:tweetid/comment', function(req, res, next) {
    res.render('comment', { title: 'Add Comment', tweet:req.params.tweetid});
});

// inserts a tweet and then rerenders it on the client
router.post('/:tweetid/comment', function(req, res, next){
	
    Tweet.findOne({_id:req.params.tweetid}, function (err, doc) {
        // creates a comments field if there isn't one already there
        if(!doc['Comments']){
            doc['Comments']=[];
            doc['Comments'].push(req.body.comment);
        }else{
            doc['Comments'].push(req.body.comment);
        }
        doc.save();
        next()
    });
},function(req,res){
    return res.redirect('/tweets/'+req.params.tweetid);
});

module.exports = router;