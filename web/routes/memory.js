
var express = require('express');

var monitor = require('../modules/MemoryMonitor');

var router = express.Router();

router.get('/procrank/:server', function(req, res, next) {

    var server = req.params.server;
    var debug = req.query.debug;
    var id = req.query.id;

    const promise = monitor.GetCmdProcrank({server: server, debug: debug});
    promise.then(function(response) {
        res.json(response);
    });
});

router.get('/status/:server', function(req, res, next) {

    var server = req.params.server;
    var debug = req.query.debug;
    var id = req.query.id;

    const promise = monitor.GetProcMeminfo({server: server, debug: debug});
    promise.then(function(response) {
        res.json(response);
    });
});

router.get('/capacity/:server', function(req, res, next) {

    var server = req.params.server;
    var debug = req.query.debug;
    var id = req.query.id;

    const promise = monitor.GetCapacity({server: server, debug: debug});
    promise.then(function(response) {
        res.json(response);
    });
});

module.exports = router;
