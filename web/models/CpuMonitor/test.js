/**
 * Created by mxu on 12/30/16.
 */

var monitor = require('./index');
var util = require('../Utility');

var server = 'www.linuxep.com';

monitor.GetCpuCount({server: server, debug: true}, function(resultData) {
    util.printJson(resultData);
});