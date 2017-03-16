
var express = require('express');

var memoryMonitor = require('../models/MemoryMonitor');

var router = express.Router();

router.get('/procrank/:server', function(req, res, next) {

    var server = req.params.server;
    var debug = req.query.debug;
    var id = req.query.id;

    memoryMonitor.GetCmdProcrank({server: server, debug: debug}, function(response) {
        res.json(response);
    });
});

router.get('/status/:server', function(req, res, next) {

    var server = req.params.server;
    var debug = req.query.debug;
    var id = req.query.id;

    memoryMonitor.GetProcMeminfo({server: server, debug: debug}, function(response) {
        res.json(response);
    });
});

router.get('/capacity/:server', function(req, res, next) {

    var server = req.params.server;
    var debug = req.query.debug;
    var id = req.query.id;

    memoryMonitor.GetCapacity({server: server, debug: debug}, function(response) {
        res.json(response);
    });
});

module.exports = router;
