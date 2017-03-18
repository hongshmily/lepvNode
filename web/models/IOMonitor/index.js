
var IOMonitor = function() {
};

IOMonitor.prototype.GetCmdIotop = function(options, callback) {

    const commander = require('./GetCmdIotop');
    commander.run(options, callback);
};

IOMonitor.prototype.GetCmdIostat = function(options, callback) {

    const commander = require('./GetCmdIostat');
    commander.run(options, callback);
};

IOMonitor.prototype.GetCmdDf = function(options, callback) {

    const commander = require('./GetCmdDf');
    commander.run(options, callback);
};


module.exports = new IOMonitor();
