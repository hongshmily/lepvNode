/**
 * Created by mxu on 12/30/16.
 */

var lepdCaller = require('./index');

var server = 'www.linuxep.com';
var commands = [
    'SayHello',
    'GetProcCpuinfo'
];

// commands.forEach(function(command) {
//     lepdCaller.callCommand(server, command, function(responseLines) {
//         console.log("Calling command: " + command);
//         console.log(responseLines);
//     });
// });