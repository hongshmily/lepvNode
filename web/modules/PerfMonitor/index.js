
var PerfMonitor = function() {
};

PerfMonitor.prototype.GetCmdPerfCpuclock = function(options) {

    return new Promise( (resolve, reject) => {

        const commander = require('./GetCmdPerfCpuclock');
        const commanderPromise = commander.run(options);

        commanderPromise.then(function(response) {
            resolve(response);
        });

    });
};


module.exports = new PerfMonitor();
