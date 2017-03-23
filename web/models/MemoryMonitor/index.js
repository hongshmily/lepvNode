
var lepdCaller = require('../LepdCaller');

var MemoryMonitor = function() {
};

MemoryMonitor.prototype.GetCmdProcrank = function(options, callback) {

    const commander = require('./GetCmdProcrank');
    commander.run(options, callback);

};

MemoryMonitor.prototype.GetProcMeminfo = function(options, callback) {

    const commander = require('./GetProcMeminfo');
    commander.run(options, callback);

};

MemoryMonitor.prototype.GetCapacity = function(options, callback) {

    this.GetProcMeminfo(options, function(response) {

        // extract the data of interest.


        callback(response);
    });
};


module.exports = new MemoryMonitor();
