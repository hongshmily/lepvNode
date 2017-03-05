var express = require('express');
var request = require('request');

var cpuMonitor = require('../models/CpuMonitor');

var router = express.Router();

router.get('/count/:server', function(req, res, next) {

    var server = req.params.server;
    var debug = req.query.debug;
    var id = req.query.id;

    cpuMonitor.GetCpuCount({server: server, debug: debug}, function(response) {
        res.json(response);
    });
});

module.exports = router;
