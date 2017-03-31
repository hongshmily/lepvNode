
const assert = require('assert');
const fs = require('fs');
const async = require('async');
const diff = require('deep-diff').diff;
const Promise = require('bluebird');

var UnitTester = function() {
};

// a method to tell if the "expected" object is "INCLUDED" in the response object.
// with "INCLUDE", we can just specify the key data in the "expected" without having to
// put the complete result there.
// both objects should have the root as "data"
UnitTester.prototype.validate = function(expected, response) {

    const validationResults = [];

    return new Promise(function(resolve, reject){

        if (!expected) {
            validationResults.push("'expected' not specified in the test data");
            resolve(validationResults);
        }

        if (!('data' in expected)) {
            validationResults.push("'data' is not in the expected object");
            resolve(validationResults);
        }

        if (!('data' in response)) {
            validationResults.push("'data' is not in the expected object");
            resolve(validationResults);
        }

        async.forEach(Object.keys(expected.data), function (item, callback){
            const diffResult = diff(expected.data[item], response.data[item]);
            if (diffResult) {

                // TODO: revise the result so it's more readable:

                validationResults.push(diffResult);
            }

            // tell async that that particular element of the iterator is done
            callback();

        }, function(err) {
            resolve(validationResults);

        });

    });
};

UnitTester.prototype.run = function(commander, testDataFile) {

    const thisTester = this;

    return new Promise(function(resolve, reject){

        fs.readFile(testDataFile, 'utf8', function (err,testDataContent) {
            if (err) {
                reject({error: err.message});
            }

            var testCases = JSON.parse(testDataContent).cases;

            async.forEach(testCases, function (testCase, callback){

                if (testCase.lepdResult) {

                    const runPromise = commander.run({debug: true, mockData: testCase.lepdResult});

                    runPromise.then(function(response) {
                        testCase['data'] = response.data;
                        testCase['rawLines'] = response.rawLines;

                        // this callback() is required for async to work properly.
                        const validatePromise = thisTester.validate(testCase.expected, response);
                        validatePromise.then(function(validationResults) {
                            testCase['validationResults'] = validationResults;
                            callback();
                        });
                    });
                } else {
                    testCase['error'] = 'lepdResult not provided!';
                    callback();
                }

            }, function(err) {
                // callback when all the cases are done.
                resolve(testCases);
            });

        });

    });



};

module.exports = new UnitTester();
