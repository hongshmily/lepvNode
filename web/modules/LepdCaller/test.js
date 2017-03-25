/**
 * Created by mxu on 12/30/16.
 */

var lepdCaller = require('./index');

var server = 'www.linuxep.com';
var commands = [
    'SayHello',
    'GetProcCpuinfo'
];

lepdCaller.ListAllMethod(server, function(data) {
    console.log(data);
});