/**
 * Created by mxu on 12/30/16.
 */


const tester = require('./index');

// tester.runCommand('cpu.status');

// tester.runCommandRepeatedly('cpu.status', 10, function(stat) {
//     console.log(stat);
// });
//
tester.runAllSupportedCommandsOneByOne(function(stat) {
    console.log(stat);
});

// tester.runCommandsOneByOne(['cpu.avgload', 'cpu.status', 'cpu.top', 'cpu.count']);