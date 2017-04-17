/**
 * Created by mxu on 12/30/16.
 */

const profiler = require('./index');
const util = require('../Utility');

const server = 'www.linuxxueyuan.com';

profiler.GetCmdPerfCpuclock({server: server, debug: true}, function(resultData) {
    util.printJson(resultData);
});