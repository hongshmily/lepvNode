/**
 * Created by mxu on 12/30/16.
 */

var lepdCaller = require('./index');

var server = 'www.linuxxueyuan.com';
var commands = [
    'SayHello',
    'GetProcCpuinfo'
];

let promise = lepdCaller.ListAllMethod(server);
// promise.then(function(data) {
//     console.log(data);
// });

promise = lepdCaller.callCommand(server, 'GetCmdProcrank');
promise.then(function(data) {
    console.log(data);
})