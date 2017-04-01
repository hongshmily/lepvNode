var express = require('express');
var request = require('request');

var lepdCaller = require('../modules/LepdCaller');

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

            if (command === 'ListAllMethod') {
                lines = lines[0].split(/\s+/);
                response = lines;
            }

            res.json(response);
        })
        .catch(function(errors) {
            res.json(errors);
        });

});

module.exports = router;
