var express = require('express');
var request = require('request');
var path = require('path');

var router = express.Router();


/* GET home page. */
router.get('/', function(req, res) {
    var htmlFile = path.join(__dirname + '/../public/index.html');
    res.sendFile(htmlFile);
});

module.exports = router;
