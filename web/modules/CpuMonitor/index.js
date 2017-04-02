
const Promise = require('bluebird');

const CpuMonitor = function() {
};

CpuMonitor.prototype.getProcessorCount = function(options, callback) {

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

CpuMonitor.prototype.GetCmdTop = function(options) {

    return new Promise( (resolve, reject) => {

        const commander = require('./GetCmdTop');
        const commanderPromise = commander.run(options);

        commanderPromise.then(function(response) {
            resolve(response);
        });

    });
};

CpuMonitor.prototype.GetAverageLoad = function(options) {

    return new Promise( (resolve, reject) => {

        const commander = require('./GetProcLoadavg');
        const commanderPromise = commander.run(options);

        commanderPromise.then(function(response) {
            resolve(response);
        });

    });

};

CpuMonitor.prototype.GetProcCpuinfo = function(options) {

    return new Promise( (resolve, reject) => {

        const commander = require('./GetProcCpuinfo');
        const commanderPromise = commander.run(options);

        commanderPromise.then(function(response) {
            resolve(response);
        });

    });
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

CpuMonitor.prototype.GetCmdMpstat = function(options) {

    return new Promise( (resolve, reject) => {

        const commander = require('./GetCmdMpstat');
        const commanderPromise = commander.run(options);

        commanderPromise.then(function(response) {
            resolve(response);
        });

    });
};

CpuMonitor.prototype.setupSocketEvents = function(socketIO) {

    const thisMonitor = this;
    let message = 'cpu.avgload';
    let messageReq = message + '.req';
    let messageRes = message + ".res";

    socketIO.on(messageReq, function(params) {
        console.log("Received client message for " + messageReq);

        let promise = thisMonitor.GetAverageLoad(params);
        promise.then(function(response) {
            socketIO.emit(messageRes, response.data);
        })
    });
};


module.exports = new CpuMonitor();
