
const CpuMonitor = function() {
};

CpuMonitor.prototype.getProcessorCount = function(options, callback) {

    const commander = require('./GetCpuInfo');
    commander.run(options, function(response) {

        if ('cpunr' in response.data) {
            response['data']['count'] = response['data']['cpunr'];
        } else {
            response['error'] = 'Failed to locate "cpunr" in the response';
        }

        callback(response);

    });
};

CpuMonitor.prototype.GetCmdTop = function(options, callback) {

    const commander = require('./GetCmdTop');
    commander.run(options, callback);
};

CpuMonitor.prototype.GetAverageLoad = function(options, callback) {

    const commander = require('./GetProcLoadavg');
    commander.run(options, callback);
};

CpuMonitor.prototype.GetProcCpuinfo = function(options, callback) {

    const commander = require('./GetProcCpuinfo');
    commander.run(options, callback);

};

CpuMonitor.prototype.GetCapacity = function(options, callback) {

    // TODO:
    this.GetProcCpuinfo(options, callback);
};

CpuMonitor.prototype.GetCmdMpstat = function(options, callback) {

    const commander = require('./GetCmdMpstat');
    commander.run(options, callback);
};


module.exports = new CpuMonitor();
