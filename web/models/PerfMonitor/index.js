
var lepdCaller = require('../LepdCaller');

var PerfMonitor = function() {
};

PerfMonitor.prototype.GetCmdPerfCpuclock = function(options, callback) {

    var thisMonitor = this;
    var command = 'GetCmdPerfCpuclock';

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


module.exports = new PerfMonitor();
