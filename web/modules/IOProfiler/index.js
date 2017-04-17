
var IOProfiler = function() {

    this.socketMessages = {
        'io.top': this.GetCmdIotop,
        'io.status': this.GetCmdIostat,
        'io.capacity': this.GetCapacity,
    };
};

IOProfiler.prototype.GetCmdIotop = function(options) {

    return new Promise( (resolve, reject) => {

        const commander = require('./GetCmdIotop');
        const commanderPromise = commander.run(options);

        commanderPromise.then(function(response) {
            resolve(response);
        });

    });
};

IOProfiler.prototype.GetCmdIostat = function(options) {

    return new Promise( (resolve, reject) => {

        const commander = require('./GetCmdIostat');
        const commanderPromise = commander.run(options);

        commanderPromise.then(function(response) {
            resolve(response);
        });

    });
};

IOProfiler.prototype.GetCmdDf = function(options) {

    return new Promise( (resolve, reject) => {

        const commander = require('./GetCmdDf');
        const commanderPromise = commander.run(options);

        commanderPromise.then(function(response) {
            resolve(response);
        });
    });
};

IOProfiler.prototype.GetCapacity = function(options) {

    return new Promise( (resolve, reject) => {

        const commander = require('./GetCmdDf');
        const commanderPromise = commander.run(options);

        commanderPromise.then(function(response) {
            resolve(response);
        });
    });
};


module.exports = new IOProfiler();
