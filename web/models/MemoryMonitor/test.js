/**
 * Created by mxu on 12/30/16.
 */

var memoryMonitor = require('./index');
var util = require('../Utility');

var server = 'www.linuxxueyuan.com';

memoryMonitor.GetCapacity({server: server, debug: true}, function(resultData) {
    util.printJson(resultData);
});

// memoryMonitor.GetProcMeminfo({server: server, debug: true}, function(resultData) {
//     util.printJson(resultData);
// });