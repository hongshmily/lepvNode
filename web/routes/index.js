var express = require('express');
var request = require('request');
var path = require('path');

var lepdCaller = require('../models/LepdCaller');

var router = express.Router();


/* GET home page. */
router.get('/', function(req, res) {
    var htmlFile = path.join(__dirname + '/../public/html/index.html');
    res.sendFile(htmlFile);
});

router.get('/test', function(req, res) {
    var htmlFile = path.join(__dirname + '/../public/html/test/testhome.html');
    res.sendFile(htmlFile);
});

router.get('/ping/:server', function(req, res, next) {

    var server = req.params.server;

    lepdCaller.ping(server, function(response) {
        try {
            res.json(response);
        } catch (err) {
            console.log(err);
        }

    });
});



module.exports = router;
