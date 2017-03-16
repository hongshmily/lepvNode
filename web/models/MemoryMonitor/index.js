
var lepdCaller = require('../LepdCaller');

var MemoryMonitor = function() {
};

MemoryMonitor.prototype.GetCmdProcrank = function(options, callback) {

    var thisMonitor = this;
    var command = 'GetCmdProcrank';

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

MemoryMonitor.prototype.GetProcMeminfo = function(options, callback) {

    var thisMonitor = this;
    var command = 'GetProcMeminfo';

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

MemoryMonitor.prototype.GetCapacity = function(options, callback) {

    var thisMonitor = this;
    var command = 'GetProcMeminfo';

    lepdCaller.callCommand(options.server, command)
        .then (function(lines) {

            var response = {};
            response['data'] = {};

            if (options.debug == true || options.debug == 'true') {
                response['rawLines'] = lines.slice();
                response['command'] = command;
            }

            // TODO:
            // Get capacity specific data and return it

            callback(response);
        })
        .catch(function(errors) {
            callback({error: errors});
        });
};


module.exports = new MemoryMonitor();
