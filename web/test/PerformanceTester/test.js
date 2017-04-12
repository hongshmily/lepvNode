/**
 * Created by mxu on 12/30/16.
 */


const tester = require('./index');

// tester.runCommand('cpu.avgload');

tester.runCommandRepeatedly('cpu.avgload', 10, function(stat) {
    console.log(stat);
});
//
// tester.runCommandsAsync(['cpu.avgload', 'cpu.status', 'cpu.top', 'cpu.count']);

// tester.runCommandsOneByOne(['cpu.avgload', 'cpu.status', 'cpu.top', 'cpu.count']);