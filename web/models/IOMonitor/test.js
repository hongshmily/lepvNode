/**
 * Created by mxu on 12/30/16.
 */

var monitor = require('./index');
var util = require('../Utility');

var server = 'www.linuxxueyuan.com';

monitor.GetCmdDf({server: server, debug: true}, function(resultData) {
    util.printJson(resultData);
});

monitor.GetCmdIostat({server: server, debug: true}, function(resultData) {
    util.printJson(resultData);
});

monitor.GetCmdIotop({server: server, debug: true}, function(resultData) {
    util.printJson(resultData);
});