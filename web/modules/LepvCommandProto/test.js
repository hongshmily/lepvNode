/**
 * Created by mxu on 12/30/16.
 */

const LepvCommandProto = require('./index');

var server = 'www.linuxxueyuan.com';

const commander = new LepvCommandProto('sdfasd');
commander.run({server: server, debug: true}, function() {
    console.log('xxxx');
});