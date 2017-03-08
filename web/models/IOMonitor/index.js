
var lepdCaller = require('../LepdCaller');

var IOMonitor = function() {
};

IOMonitor.prototype.GetCmdIotop = function(options, callback) {

    var thisMonitor = this;
    var command = 'GetCmdIotop';

    lepdCaller.callCommand(options.server, command)
        .then (function(lines) {

            var response = {};
            response['data'] = {};

            if (options.debug == true || options.debug == 'true') {
                response['rawLines'] = lines.slice();
                response['command'] = command;
            }

            // TODO:

            callback(response);
        })
        .catch(function(errors) {
            callback({error: errors});
        });
};

IOMonitor.prototype.GetCmdIostat = function(options, callback) {

    var thisMonitor = this;
    var command = 'GetCmdIostat';

    lepdCaller.callCommand(options.server, command)
        .then (function(lines) {

            var response = {};
            response['data'] = {};

            if (options.debug == true || options.debug == 'true') {
                response['rawLines'] = lines.slice();
                response['command'] = command;
            }

            // TODO:

            callback(response);
        })
        .catch(function(errors) {
            callback({error: errors});
        });
};

IOMonitor.prototype.GetCmdDf = function(options, callback) {

    var thisMonitor = this;
    var command = 'GetCmdDf';

    lepdCaller.callCommand(options.server, command)
        .then (function(lines) {

            var response = {};
            response['data'] = {};

            if (options.debug == true || options.debug == 'true') {
                response['rawLines'] = lines.slice();
                response['command'] = command;
            }

            // TODO:

            callback(response);
        })
        .catch(function(errors) {
            callback({error: errors});
        });
};


module.exports = new IOMonitor();
