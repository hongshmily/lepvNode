var express = require('express');
var request = require('request');
var path = require('path');

var router = express.Router();

router.get('/api', function(req, res, next) {

    var server = req.params.server;
    var debug = req.query.debug;
    var id = req.query.id;

    var htmlFile = path.join(__dirname + '/../public/html/test/api.html');
    res.sendFile(htmlFile);
});

router.get('/performance', function(req, res, next) {

    var server = req.params.server;
    var debug = req.query.debug;
    var id = req.query.id;

    var htmlFile = path.join(__dirname + '/../public/html/test/performance.html');
    res.sendFile(htmlFile);
});

router.get('/sanity', function(req, res, next) {

    var server = req.params.server;
    var debug = req.query.debug;
    var id = req.query.id;

    var htmlFile = path.join(__dirname + '/../public/html/test/sanity.html');
    res.sendFile(htmlFile);
});


module.exports = router;
