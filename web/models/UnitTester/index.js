
const assert = require('assert');
const fs = require('fs')


var UnitTester = function() {
};

UnitTester.prototype.testMethod = function(functor, testDataFile, callback) {

    fs.readFile(testDataFile, 'utf8', function (err,testDataContent) {
        if (err) {
            return console.log(err);
        }

        var testDatas = JSON.parse(testDataContent);

        testDatas.samples.forEach(function(testData) {

            functor({mockData: testData.result, debug: true}, callback);

        });
    });
};


module.exports = new UnitTester();
