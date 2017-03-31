
var lepdCaller = require('../LepdCaller');

var MemoryMonitor = function() {
};

MemoryMonitor.prototype.GetCmdProcrank = function(options) {

    return new Promise( (resolve, reject) => {

        const commander = require('./GetCmdProcrank');
        const commanderPromise = commander.run(options);

        commanderPromise.then(function(response) {
            resolve(response);
        });

    });
};

MemoryMonitor.prototype.GetProcMeminfo = function(options) {

    return new Promise( (resolve, reject) => {

        const commander = require('./GetProcMeminfo');
        const commanderPromise = commander.run(options);

        commanderPromise.then(function(response) {
            resolve(response);
        });

    });
};

MemoryMonitor.prototype.GetCapacity = function(options) {

    return this.GetProcMeminfo(options);

};


module.exports = new MemoryMonitor();
