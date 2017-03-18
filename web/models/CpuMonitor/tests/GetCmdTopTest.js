/**
 * Created by mxu on 12/30/16.
 */

var cpuMonitor = require('../index');
var util = require('../../Utility');
var unitTester = require('../../UnitTester');

const path = require('path');

var testDataFilePath = './GetCmdTop.json';

testDataFilePath = path.resolve(testDataFilePath);
unitTester.test(cpuMonitor.GetCmdTop, testDataFilePath, function(testResult) {

    util.printJson(testResult);
});

