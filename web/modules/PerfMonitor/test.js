/**
 * Created by mxu on 12/30/16.
 */

var perfMonitor = require('./index');
var util = require('../Utility');

var server = 'www.linuxxueyuan.com';

perfMonitor.GetCmdPerfCpuclock({server: server, debug: true}, function(resultData) {
    util.printJson(resultData);
});