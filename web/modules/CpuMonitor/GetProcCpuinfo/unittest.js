/**
 * Created by mxu on 12/30/16.
 */

const commander = require('./index');
const util = require('../../Utility');
const unitTester = require('../../UnitTester');
const path = require('path');

const testDataFilePath = path.join(__dirname, 'unittest.json');

unitTester.run(commander, testDataFilePath);
