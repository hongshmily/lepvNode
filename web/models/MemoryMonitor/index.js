
var lepdCaller = require('../LepdCaller');

var MemoryMonitor = function() {
};

MemoryMonitor.prototype.GetCmdProcrank = function(options, callback) {

    var thisMonitor = this;
    var command = 'GetCmdProcrank';

    var response = {};
    response['data'] = {};
    lepdCaller.callCommand(options.server, command)
        .then (function(lines) {

            if (options.debug == true || options.debug == 'true') {
                response['rawLines'] = lines.slice();
                response['command'] = command;
            }

            // TODO:
            // Get capacity specific data and return it

            callback(response);
        })
        .catch(function(errors) {
            response['error'] = errors.message;
            callback(response);
        });
};

MemoryMonitor.prototype.GetProcMeminfo = function(options, callback) {

    var thisMonitor = this;
    var command = 'GetProcMeminfo';

    var response = {};
    response['data'] = {};
    lepdCaller.callCommand(options.server, command)
        .then (function(lines) {

            if (options.debug == true || options.debug == 'true') {
                response['rawLines'] = lines.slice();
                response['command'] = command;
            }

            // TODO:
            // Get capacity specific data and return it

            callback(response);
        })
        .catch(function(errors) {
            response['error'] = errors.message;
            callback(response);
        });
};

MemoryMonitor.prototype.GetCapacity = function(options, callback) {

    var thisMonitor = this;
    var command = 'GetProcMeminfo';

    var response = {};
    response['data'] = {};
    lepdCaller.callCommand(options.server, command)
        .then (function(lines) {

            if (options.debug == true || options.debug == 'true') {
                response['rawLines'] = lines.slice();
                response['command'] = command;
            }

            // TODO:
            // Get capacity specific data and return it

            callback(response);
        })
        .catch(function(errors) {
            response['error'] = errors.message;
            callback(response);
        });
};


module.exports = new MemoryMonitor();
