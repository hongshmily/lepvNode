
var express = require('express');

var profiler = require('../modules/IOProfiler');

var router = express.Router();

router.get('/top/:server', function(req, res, next) {

    var server = req.params.server;
    var debug = req.query.debug;
    var id = req.query.id;

    const promise = profiler.GetCmdIotop({server: server, debug: debug});
    promise.then(function(response) {
        res.json(response);
    });
});

router.get('/status/:server', function(req, res, next) {

    var server = req.params.server;
    var debug = req.query.debug;
    var id = req.query.id;

    const promise = profiler.GetCmdIostat({server: server, debug: debug});
    promise.then(function(response) {
        res.json(response);
    });
});

router.get('/capacity/:server', function(req, res, next) {

    var server = req.params.server;
    var debug = req.query.debug;
    var id = req.query.id;

    const promise = profiler.GetCapacity({server: server, debug: debug});
    promise.then(function(response) {
        res.json(response);
    });
});


module.exports = router;
