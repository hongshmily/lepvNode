/**
 * Created by mxu on 12/30/16.
 */

const currentDir = __dirname;
const dirNames = currentDir.split('/');

const parentDirName = dirNames.pop();
const grandParentDirName = dirNames.pop();

const commanderPath = '../../../modules/' + grandParentDirName + '/' + parentDirName + '/index';
const commander = require(commanderPath);
const util = require('../../../modules/Utility');
const unitTester = require('../../UnitTester');
const path = require('path');

const testDataFilePath = path.join(__dirname, 'unittest.json');

unitTester.run(commander, testDataFilePath);