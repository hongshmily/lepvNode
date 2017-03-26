/**
 * Created by mxu on 12/30/16.
 */

const Commander = require('./index');
const util = require('../../Utility');
const unitTester = require('../../UnitTester');
const path = require('path');

const testDataFilePath = path.resolve('./unittest.json');

unitTester.run(new Commander(), testDataFilePath, function(testResults) {
    util.printJson(testResults);
});
