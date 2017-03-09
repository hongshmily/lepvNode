/**
 * Created by mxu on 12/30/16.
 */

var fs = require("fs");
var cpuMonitor = require('../index');
var util = require('../../Utility');
var unitTester = require('../../UnitTester');

var testDataFilePath = './GetCmdTop.json';


var testDataContent = fs.readFileSync(testDataFilePath);
var testDatas = JSON.parse(testDataContent);

unitTester.testMethod(cpuMonitor.GetCmdTop, testDatas, function(testResult) {

    util.printJson(testResult);
});

