
const Promise = require('bluebird');

const CpuProfiler = function() {

    this.socketMessages = {
        'cpu.avgload': this.GetAverageLoad,
        'cpu.count': this.getProcessorCount,
        'cpu.top': this.GetCmdTop,
        'cpu.status': this.GetCmdMpstat
    };
};

CpuProfiler.prototype.getProcessorCount = function(options) {

    return new Promise( (resolve, reject) => {

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

    });

};

CpuProfiler.prototype.GetCmdTop = function(options) {

    return new Promise( (resolve, reject) => {

        const commander = require('./GetCmdTop');
        const commanderPromise = commander.run(options);

        commanderPromise.then(function(response) {
            resolve(response);
        });

    });
};

CpuProfiler.prototype.GetAverageLoad = function(options) {

    return new Promise( (resolve, reject) => {

        const commander = require('./GetProcLoadavg');
        const commanderPromise = commander.run(options);

        commanderPromise.then(function(response) {
            resolve(response);
        });

    });

};

CpuProfiler.prototype.GetProcCpuinfo = function(options) {

    return new Promise( (resolve, reject) => {

        const commander = require('./GetProcCpuinfo');
        const commanderPromise = commander.run(options);

        commanderPromise.then(function(response) {
            resolve(response);
        });

    });
};

CpuProfiler.prototype.GetCapacity = function(options) {

    return this.GetProcCpuinfo();
};

CpuProfiler.prototype.GetCmdMpstat = function(options) {

    return new Promise( (resolve, reject) => {

        const commander = require('./GetCmdMpstat');
        const commanderPromise = commander.run(options);

        commanderPromise.then(function(response) {
            resolve(response);
        });

    });
};



module.exports = new CpuProfiler();
