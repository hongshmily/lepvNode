var express = require('express');
var request = require('request');
var path = require('path');

var testManager = require('../models/TestManager');

var router = express.Router();


/* GET home page. */
router.get('/', function(req, res) {
    var htmlFile = path.join(__dirname + '/../public/index.html');
    res.sendFile(htmlFile);
});

router.get('/case', function(req, res) {

    var htmlFile = path.join(__dirname + '/../public/case.html');
    res.sendFile(htmlFile);
});

router.get('/report', function(req, res) {

    var htmlFile = path.join(__dirname + '/../public/report.html');
    res.sendFile(htmlFile);
});

router.get('/mongo/diff', function(req, res, next) {

    var htmlFile = path.join(__dirname + '/../public/mongo.html');
    res.sendFile(htmlFile);

});

router.get('/job/:buildurl*', function(req, res) {

    var buildUrl = encodeURI(req.params.buildurl + req.params[0]);
    console.log(buildUrl);

    res.render('job', { buildUrl: buildUrl })
});

router.get('/trackedjobs', function(req, res, next) {
    testManager.getTrackedJobs(function(jobs) {
        res.json(jobs);
    });
});

router.get('/projectviewmap', function(req, res, next) {
    testManager.getProjectViewMap(function(viewMap) {
        res.json(viewMap);
    });
});

router.get('/jobtags', function(req, res, next) {
    testManager.getTrackedJobs(function(jobs) {
        res.json(jobs);
    });
});

module.exports = router;
