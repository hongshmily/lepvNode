/**
 * Created by mxu on 12/30/16.
 */

const commander = require('./index');
const util = require('../../Utility');
const unitTester = require('../../UnitTester');
const path = require('path');

const testDataFilePath = path.resolve('./unittest.json');

unitTester.run(commander, testDataFilePath, function(testResults) {
    util.printJson(testResults);
});