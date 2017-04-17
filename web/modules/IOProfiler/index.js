
var IOMonitor = function() {

    this.socketMessages = {
        'io.top': this.GetCmdIotop,
        'io.status': this.GetCmdIostat,
        'io.capacity': this.GetCapacity,
    };
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

    return new Promise( (resolve, reject) => {

        const commander = require('./GetCmdDf');
        const commanderPromise = commander.run(options);

        commanderPromise.then(function(response) {
            resolve(response);
        });
    });
};


module.exports = new IOMonitor();
