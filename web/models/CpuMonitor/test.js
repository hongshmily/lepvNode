/**
 * Created by mxu on 12/30/16.
 */

var monitor = require('./index');
var util = require('../Utility');

var server = 'www.linuxxueyuan.com';

monitor.GetCpuCount({server: server, debug: true}, function(resultData) {
    util.printJson(resultData);
});

monitor.GetProcCpuinfo({server: server, debug: true}, function(resultData) {
    util.printJson(resultData);
});

monitor.GetAverageLoad({server: server, debug: true}, function(resultData) {
    util.printJson(resultData);
});

monitor.GetConfig({server: server, debug: true}, function(resultData) {
    util.printJson(resultData);
});

monitor.GetCmdTop({server: server, debug: true}, function(resultData) {
    util.printJson(resultData);
});

monitor.GetCmdMpstat({server: server, debug: true}, function(resultData) {
    util.printJson(resultData);
});