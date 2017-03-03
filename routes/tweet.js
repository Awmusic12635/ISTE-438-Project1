var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
    , Tweet = mongoose.model('Tweet');

router.get('/:tweetid', function(req, res, next) {
    Tweet.findOne({_id:req.params.tweetid}, function (err, doc) {
        res.render('details', { title: 'Tweet' ,tweet: doc});
     });
});

module.exports = router;