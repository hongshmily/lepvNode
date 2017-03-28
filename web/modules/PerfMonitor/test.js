/**
 * Created by mxu on 12/30/16.
 */

const perfMonitor = require('./index');
const util = require('../Utility');

const server = 'www.linuxxueyuan.com';

perfMonitor.GetCmdPerfCpuclock({server: server, debug: true}, function(resultData) {
    util.printJson(resultData);
});