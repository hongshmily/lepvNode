
const assert = require('assert');
const fs = require('fs');
const async = require('async');

var UnitTester = function() {
};

UnitTester.prototype.run = function(commander, testDataFile, callback) {

    fs.readFile(testDataFile, 'utf8', function (err,testDataContent) {
        if (err) {
            callback({error: err.message});
        }

        var testCases = JSON.parse(testDataContent).cases;

        async.forEach(testCases, function (testCase, callback){

            if (testCase.lepdResult) {
                commander.run({debug: true, mockData: testCase.lepdResult}, function(response) {
                    testCase['data'] = response.data;
                    testCase['rawLines'] = response.rawLines;

                    // this callback() is required for async to work properly.
                    callback();
                });
            } else {
                testCase['error'] = 'lepdResult not provided!';
                callback();
            }

        }, function(err) {
            // callback when all the cases are done.
            callback(testCases);
        });

    });
};

module.exports = new UnitTester();
