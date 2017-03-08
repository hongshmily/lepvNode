/**
 * Created by mxu on 12/30/16.
 */

var cpuMonitor = require('./index');
var util = require('../Utility');

var server = 'www.linuxxueyuan.com';

cpuMonitor.GetCpuCount({server: server, debug: true}, function(resultData) {
    util.printJson(resultData);
});

cpuMonitor.GetProcCpuinfo({server: server, debug: true}, function(resultData) {
    util.printJson(resultData);
});

cpuMonitor.GetAverageLoad({server: server, debug: true}, function(resultData) {
    util.printJson(resultData);
});

cpuMonitor.GetConfig({server: server, debug: true}, function(resultData) {
    util.printJson(resultData);
});

cpuMonitor.GetCmdTop({server: server, debug: true}, function(resultData) {
    util.printJson(resultData);
});

cpuMonitor.GetCmdMpstat({server: server, debug: true}, function(resultData) {
    util.printJson(resultData);
});