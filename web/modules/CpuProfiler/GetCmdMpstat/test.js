/**
 * Created by mxu on 12/30/16.
 */

const commander = require('./index');
const util = require('../../Utility');

const server = 'www.linuxxueyuan.com';
const options = {server: server, debug: true};

const promise = commander.run(options);

promise.then(function(response) {
    util.printJson(response);
});