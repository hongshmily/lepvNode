var express = require('express');
var request = require('request');

var lepdCaller = require('../models/LepdCaller');

var router = express.Router();

router.get('/:command/:server', function(req, res, next) {

    var command = req.params.command;
    var server = req.params.server;

    if (command == 'list') {
        command = 'ListAllMethod';
    }

    lepdCaller.callCommand(server, command)
        .then (function(lines) {
            var response = {};
            response['rawLines'] = lines;

            res.json(response);
        })
        .catch(function(errors) {
            res.json(errors);
        });

});

module.exports = router;
