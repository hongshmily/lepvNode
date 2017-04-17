var express = require('express');
var request = require('request');
var path = require('path');

var lepdCaller = require('../modules/LepdCaller');

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

router.get('/swagger', function(req, res, next) {

    var htmlFile = path.join(__dirname + '/../public/html/swagger.html');
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

router.get('/sockets', function(req, res, next) {

    var
    var messages = [
        'cpu.'
    ];



    lepdCaller.ping(server, function(response) {
        try {
            res.json(response);
        } catch (err) {
            console.log(err);
        }

    });
});


module.exports = router;
