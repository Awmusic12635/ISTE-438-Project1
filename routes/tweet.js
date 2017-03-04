var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
    , Tweet = mongoose.model('Tweet');

router.get('/:tweetid', function(req, res, next) {
    Tweet.findOne({_id:req.params.tweetid}, function (err, doc) {
        res.render('details', { title: 'Tweet' ,tweet: doc});
     });
});

router.get('/:tweetid/comment', function(req, res, next) {
    res.render('comment', { title: 'Add Comment', tweet:req.params.tweetid});
});

router.post('/:tweetid/comment', function(req, res, next){

    Tweet.findOne({_id:req.params.tweetid}, function (err, doc) {
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