var express = require('express');

var monitor = require('../models/PerfMonitor');

var router = express.Router();

router.get('/cpuclock/:server', function(req, res, next) {

    var server = req.params.server;
    var debug = req.query.debug;
    var id = req.query.id;

    monitor.GetCmdPerfCpuclock({server: server, debug: debug}, function(response) {
        res.json(response);
    });
});


module.exports = router;
