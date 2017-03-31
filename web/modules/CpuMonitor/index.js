
const Promise = require('bluebird');

const CpuMonitor = function() {
};

CpuMonitor.prototype.getProcessorCount = function(options, callback) {

    const commander = require('./GetCpuInfo');

    const commanderPromise = commander.run(options);
    commanderPromise.then(function(response) {

        if ('cpunr' in response.data) {
            response['data']['count'] = response['data']['cpunr'];

            resolve(response);
        } else {
            response['error'] = 'Failed to locate "cpunr" in the response';

            reject(response);
        }

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

    this.GetProcCpuinfo(options, function(response) {

        // TODO:
        // need to way to tell the following properties:
        // architecture: ARM or X86
        // model
        // summary
        // bogomips

        callback(response);

    })
};

CpuMonitor.prototype.GetCmdMpstat = function(options, callback) {

    const commander = require('./GetCmdMpstat');
    commander.run(options, callback);
};


module.exports = new CpuMonitor();
