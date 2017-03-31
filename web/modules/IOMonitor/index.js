
var IOMonitor = function() {
};

IOMonitor.prototype.GetCmdIotop = function(options) {

    return new Promise( (resolve, reject) => {

        const commander = require('./GetCmdIotop');
        const commanderPromise = commander.run(options);

        commanderPromise.then(function(response) {
            resolve(response);
        });

    });
};

IOMonitor.prototype.GetCmdIostat = function(options) {

    return new Promise( (resolve, reject) => {

        const commander = require('./GetCmdIostat');
        const commanderPromise = commander.run(options);

        commanderPromise.then(function(response) {
            resolve(response);
        });

    });
};

IOMonitor.prototype.GetCmdDf = function(options) {

    return new Promise( (resolve, reject) => {

        const commander = require('./GetCmdDf');
        const commanderPromise = commander.run(options);

        commanderPromise.then(function(response) {
            resolve(response);
        });

    });
};

IOMonitor.prototype.GetCapacity = function(options) {

    return this.GetCmdDf(options);
};


module.exports = new IOMonitor();
