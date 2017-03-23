
var express = require('express');

var monitor = require('../models/IOMonitor');

var router = express.Router();

router.get('/top/:server', function(req, res, next) {

    var server = req.params.server;
    var debug = req.query.debug;
    var id = req.query.id;

    monitor.GetCmdIotop({server: server, debug: debug}, function(response) {
        res.json(response);
    });
});

router.get('/status/:server', function(req, res, next) {

    var server = req.params.server;
    var debug = req.query.debug;
    var id = req.query.id;

    monitor.GetCmdIostat({server: server, debug: debug}, function(response) {
        res.json(response);
    });
});

router.get('/capacity/:server', function(req, res, next) {

    var server = req.params.server;
    var debug = req.query.debug;
    var id = req.query.id;

    monitor.GetCapacity({server: server, debug: debug}, function(response) {
        res.json(response);
    });
});


module.exports = router;
