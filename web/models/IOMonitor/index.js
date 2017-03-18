
var lepdCaller = require('../LepdCaller');

var IOMonitor = function() {
};

IOMonitor.prototype.GetCmdIotop = function(options, callback) {

    var thisMonitor = this;
    var command = 'GetCmdIotop';

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

// the output of this command is like below:
// "Linux 3.13.0-77-generic (ubuntu) \t03/15/17 \t_x86_64_\t(2 CPU)",
// "",
// "Device:         rrqm/s   wrqm/s     r/s     w/s    rkB/s    wkB/s avgrq-sz avgqu-sz   await r_await w_await  svctm  %util",
// "sda               0.03     0.13    0.53    0.09     9.87     3.56    42.81     0.03   42.71    9.87  232.45   6.55   0.41",
// "",
// ""

IOMonitor.prototype.GetCmdIostat = function(options, callback) {

    var thisMonitor = this;
    var command = 'GetCmdIostat';

    var response = {};
    response['data'] = {};
    response['data']['disks'] = {};

    lepdCaller.callCommand(options.server, command)
        .then (function(lines) {

            if (options.debug == true || options.debug == 'true') {
                response['rawLines'] = lines.slice();
                response['command'] = command;
            }

            if( !lines || (lines.length == 0) ) {
                callback(response);
            }

            // Done by Ting
            var line = lines.shift();
            while( lines.length > 0 && !line.match(/Device:\s+rrqm/)) {
                line = lines.shift();
            }

            if (lines.length == 0) {
                response['error'] = 'Failed to locate a header line beginning with "Device: rrqm..."';
                callback(response);
            }

            var headerColumns = line.trim().split(/\s+/);
            while (lines.length > 0) {
                line = lines.shift();
                if (line.trim() == "") {
                    continue
                }

                var lineValues = line.trim().split(/\s+/);

                var deviceName = lineValues[0];

                response['data']['disks'][deviceName] = {};
                response['data']['disks'][deviceName]['rkbs'] = parseFloat(lineValues[5]);
                response['data']['disks'][deviceName]['wkbs'] = parseFloat(lineValues[6]);
                response['data']['disks'][deviceName]['ratio'] = parseFloat(lineValues[lineValues.length-1]);
            }

            callback(response);
        })
        .catch(function(errors) {
            response['error'] = errors.message;
            callback(response);
        });
};

IOMonitor.prototype.GetCmdDf = function(options, callback) {

    var thisMonitor = this;
    var command = 'GetCmdDf';

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


module.exports = new IOMonitor();
