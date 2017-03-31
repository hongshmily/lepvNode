/**
 * Created by mxu on 12/30/16.
 */

var monitor = require('./index');
var util = require('../Utility');
var unitTester = require('../UnitTester');

var server = 'www.linuxxueyuan.com';

var promise = monitor.getProcessorCount({server: server, debug: true});
promise.then( function(resultData) {
    util.printJson(resultData);
});

//
// cpuMonitor.GetProcCpuinfo({server: server, debug: true}, function(resultData) {
//     util.printJson(resultData);
// });
//
monitor.GetAverageLoad({server: server, debug: true}, function(resultData) {
    util.printJson(resultData);
});

// cpuMonitor.GetConfig({server: server, debug: true}, function(resultData) {
//     util.printJson(resultData);
// });
//
// cpuMonitor.GetCmdTop({server: server, debug: true}, function(resultData) {
//     util.printJson(resultData);
// });
//
// cpuMonitor.GetCmdMpstat({server: server, debug: true}, function(resultData) {
//     util.printJson(resultData);
// });