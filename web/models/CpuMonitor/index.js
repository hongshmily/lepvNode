
var lepdCaller = require('../LepdCaller');

var CpuMonitor = function() {
};

CpuMonitor.prototype.GetProcCpuinfo = function(server, callback) {

    var command = 'GetProcCpuinfo';
    lepdCaller.callCommand(server, command, function(lines) {
        callback(lines);
    });
};

CpuMonitor.prototype.GetCpuCount = function(options, callback) {

    var command = 'GetCpuInfo';
    lepdCaller.callCommand(options.server, command, function(lines) {

        var response = {};

        if(options.debug == true) {
            response['rawLines'] = lines.slice();
        }

        response['data'] = {};
        for (var lineIndex = 0; lineIndex < lines.length; lineIndex++) {

            var line = lines[lineIndex];
            if (line.startsWith('cpunr')) {
                response['data']['count'] = parseInt(line.split(':')[1].trim());
                break;
            }
        }

        if (!response['data']['count']) {
            response['error'] = 'Failed in getting processor count by  GetCpuInfo';
        }

        callback(response);
    });
};

module.exports = new CpuMonitor();
