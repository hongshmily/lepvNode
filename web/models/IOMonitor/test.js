/**
 * Created by mxu on 12/30/16.
 */

var ioMonitor = require('./index');
var util = require('../Utility');

var server = 'www.linuxxueyuan.com';

ioMonitor.GetCmdDf({server: server, debug: true}, function(resultData) {
    util.printJson(resultData);
});

ioMonitor.GetCmdIostat({server: server, debug: true}, function(resultData) {
    util.printJson(resultData);
});

ioMonitor.GetCmdIotop({server: server, debug: true}, function(resultData) {
    util.printJson(resultData);
});