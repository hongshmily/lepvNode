/**
 * Created by mxu on 12/30/16.
 */

var commander = require('./index');
var util = require('../../Utility');

var server = 'www.linuxep.com';
const options = {server: server, debug: true};

commander.run(options, function(response) {
    util.printJson(response);
});