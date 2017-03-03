var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
    , Tweet = mongoose.model('Tweet');

router.get('/', function(req, res, next) {
    console.log(req.query.search['value']);
    Tweet.paginate({"Tweet content":{ "$regex": ''+req.query.search['value']} },{ lean: true, offset: parseInt(req.query.start),
        limit: parseInt(req.query.length) }).then(function(result) {
        var data = {'data':result.docs,'recordsTotal':result.total,'recordsFiltered':result.total,'draw': parseInt(req.query.draw)};
        res.json(data);
    });
});

module.exports = router;