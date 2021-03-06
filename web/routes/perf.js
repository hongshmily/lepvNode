var express = require('express');

var profiler = require('../modules/PerfProfiler');

var router = express.Router();

router.get('/cpuclock/:server', function(req, res, next) {

    var server = req.params.server;
    var debug = req.query.debug;
    var id = req.query.id;

    const promise = profiler.GetCmdPerfCpuclock({server: server, debug: debug});
    promise.then(function(response) {
        res.json(response);
    });
});


module.exports = router;
