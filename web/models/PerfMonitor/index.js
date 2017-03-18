
var lepdCaller = require('../LepdCaller');

var PerfMonitor = function() {
};

PerfMonitor.prototype.GetCmdPerfCpuclock = function(options, callback) {

    var thisMonitor = this;
    var command = 'GetCmdPerfCpuclock';

    var response = {};
    response['data'] = {};
    lepdCaller.callCommand(options.server, command)
        .then (function(lines) {

            if (options.debug == true || options.debug == 'true') {
                response['rawLines'] = lines.slice();
                response['command'] = command;
            }

            // TODO:

            callback(response);
        })
        .catch(function(error) {
            response['error'] = error.message;
            callback(response);
        });
};


module.exports = new PerfMonitor();
