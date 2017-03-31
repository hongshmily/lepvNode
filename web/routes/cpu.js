
const express = require('express');

const cpuMonitor = require('../modules/CpuMonitor');

const router = express.Router();

router.get('/count/:server', function(req, res, next) {

    var server = req.params.server;
    var debug = req.query.debug || false;
    var reqid = req.query.reqid || 0;

    if (!server) {
        res.json({error: 'server not specified'});
    }

    const promise = cpuMonitor.getProcessorCount({server: server, debug: debug});
    promise.then(function(response) {
        if (response) {
            response['reqid'] = reqid;
        }

        res.json(response);
    });
});

router.get('/top/:server', function(req, res, next) {

    var server = req.params.server;
    var debug = req.query.debug;
    var reqid = req.query.reqid;

    if (!server) {
        res.json({error: 'server not specified'});
    }

    const promise = cpuMonitor.GetCmdTop({server: server, debug: debug});
    promise.then(function(response) {
        if (response) {
            response['reqid'] = reqid;
        }

        res.json(response);
    });
});

router.get('/avgload/:server', function(req, res, next) {

    var server = req.params.server;

    var debug = req.query.debug;
    var reqid = req.query.reqid;

    if (!server) {
        res.json({error: 'server not specified'});
    }

    const promise = cpuMonitor.GetAverageLoad({server: server, debug: debug});
    promise.then(function(response) {
        res.json(response);
    });
});

router.get('/capacity/:server', function(req, res, next) {

    var server = req.params.server;
    var debug = req.query.debug;
    var reqid = req.query.reqid;

    if (!server) {
        res.json({error: 'server not specified'});
    }

    const promise = cpuMonitor.GetProcCpuinfo({server: server, debug: debug});
    promise.then(function(response) {
        res.json(response);
    });
});

router.get('/status/:server', function(req, res, next) {

    const server = req.params.server;
    const debug = req.query.debug;
    const reqid = req.query.reqid;

    if (!server) {
        res.json({error: 'server not specified'});
    }

    const promise = cpuMonitor.GetCmdMpstat({server: server, debug: debug});
    promise.then(function(response) {
        res.json(response);
    });
});

module.exports = router;
