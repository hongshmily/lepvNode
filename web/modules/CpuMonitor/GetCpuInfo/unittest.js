/**
 * Created by mxu on 12/30/16.
 */

const commander = require('./index');
const util = require('../../Utility');
const unitTester = require('../../UnitTester');
const path = require('path');

const testDataFilePath = path.resolve('./unittest.json');

const promise = unitTester.run(commander, testDataFilePath);
promise.then(function(testResults) {
    util.printJson(testResults);
});
