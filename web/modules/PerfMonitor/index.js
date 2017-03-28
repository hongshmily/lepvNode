
var PerfMonitor = function() {
};

PerfMonitor.prototype.GetCmdPerfCpuclock = function(options, callback) {

    const commander = require('./GetCmdPerfCpuclock');
    commander.run(options, callback);
};


module.exports = new PerfMonitor();
