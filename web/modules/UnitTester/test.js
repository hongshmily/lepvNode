/**
 * Created by mxu on 12/30/16.
 */
var util = require('../Utility');
var unitTester = require('./index');


unitTester.test(functor, testDFile, function(resultData) {
    util.printJson(resultData);
});