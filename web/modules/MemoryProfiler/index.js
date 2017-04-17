
var lepdCaller = require('../LepdCaller');

var MemoryProfiler = function() {

    this.socketMessages = {
        'memory.procrank': this.GetCmdProcrank,
        'memory.status': this.GetProcMeminfo,
        'memory.capacity': this.GetCapacity,
    };

};

MemoryProfiler.prototype.GetCmdProcrank = function(options) {

    return new Promise( (resolve, reject) => {

        const commander = require('./GetCmdProcrank');
        const commanderPromise = commander.run(options);

        commanderPromise.then(function(response) {
            resolve(response);
        });

    });
};

MemoryProfiler.prototype.GetProcMeminfo = function(options) {

    return new Promise( (resolve, reject) => {

        const commander = require('./GetProcMeminfo');
        const commanderPromise = commander.run(options);

        commanderPromise.then(function(response) {
            resolve(response);
        });

    });
};

MemoryProfiler.prototype.GetCapacity = function(options) {

    return new Promise( (resolve, reject) => {

        const commander = require('./GetProcMeminfo');
        const commanderPromise = commander.run(options);

        commanderPromise.then(function(response) {
            resolve(response);
        });

    });

};


module.exports = new MemoryProfiler();
