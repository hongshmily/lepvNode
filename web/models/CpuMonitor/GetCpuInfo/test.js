/**
 * Created by mxu on 12/30/16.
 */

var Commander = require('./index');
var util = require('../../Utility');

var server = 'www.linuxxueyuan.com';
const options = {server: server, debug: true};

const commander = new Commander();
commander.run(options, function(response) {
    util.printJson(response);
});