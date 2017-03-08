var express = require('express');
var request = require('request');

var cpuMonitor = require('../models/CpuMonitor');

var router = express.Router();

router.get('/count/:server', function(req, res, next) {

    var server = req.params.server;
    var debug = req.query.debug;
    var id = req.query.id;

    if (!server) {
        res.json({error: 'server not specified'});
    } else {
        cpuMonitor.GetCpuCount({server: server, debug: debug}, function(response) {
            res.json(response);
        });
    }
});

router.get('/top/:server', function(req, res, next) {

    var server = req.params.server;
    var debug = req.query.debug;
    var id = req.query.id;

    cpuMonitor.GetCmdTop({server: server, debug: debug}, function(response) {
        res.json(response);
    });
});

router.get('/avgload/:server', function(req, res, next) {

    var server = req.params.server;

    var debug = req.query.debug;
    var id = req.query.id;

    cpuMonitor.GetAverageLoad({server: server, debug: debug}, function(response) {
        res.json(response);
    });
});

router.get('/config/:server', function(req, res, next) {

    var server = req.params.server;
    var debug = req.query.debug;
    var id = req.query.id;

    cpuMonitor.GetConfig({server: server, debug: debug}, function(response) {
        res.json(response);
    });
});

router.get('/status/:server', function(req, res, next) {

    var server = req.params.server;
    var debug = req.query.debug;
    var id = req.query.id;

    cpuMonitor.GetProcCpuinfo({server: server, debug: debug}, function(response) {
        res.json(response);
    });
});

module.exports = router;
