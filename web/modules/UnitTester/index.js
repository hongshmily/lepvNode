
const assert = require('assert');
const fs = require('fs');
const async = require('async');
const diff = require('deep-diff').diff;
const Promise = require('bluebird');

const chai = require('chai');
const expect = chai.expect;

var UnitTester = function() {
};

// a method to tell if the "expected" object is "INCLUDED" in the response object.
// with "INCLUDE", we can just specify the key data in the "expected" without having to
// put the complete result there.
// both objects should have the root as "data"

UnitTester.prototype.compare = function(expectedObject, actualObject) {

    for (var key in expectedObject) {
        if (!expectedObject.hasOwnProperty(key)) {
            continue;
        }

        expect(actualObject).have.property(key);

        // make sure the response has same field.
        expect(actualObject).have.property(key);

        if (expectedObject[key] instanceof Object) {

            this.compare(expectedObject[key], actualObject[key]);

        } else {

            // TODO:
            // Implement a logic to collect ALL assert failures before finish.
            // so we don't stop on the first failure, we stop on all failures are caught.

            // TODO:
            // custom message for the assertion failures.

            // TODO:
            // Need a way to show the "path" of a property being validated, rather than just a key
            // because it is hard to tell which data does not match from just the "key".
            expect(expectedObject[key], key + " should exit in actual response and be equal").to.equal(actualObject[key]);

        }
    }
};

UnitTester.prototype.runTestCase = function(commander, testCase) {

    const thisTester = this;

    return new Promise(function(resolve, reject){

        if (!testCase) {
            reject('test case is not null');
        }

        if (!testCase.lepdResult) {
            reject('lepdResult is not provided');
        }

        const runPromise = commander.run({debug: true, mockData: testCase.lepdResult});

        runPromise.then(function(response) {
            thisTester.compare(testCase.expected, response);

            testCase['data'] = response.data;
            testCase['rawLines'] = response.rawLines;
            resolve(testCase);
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

            const testCases = JSON.parse(testDataContent).cases;
            async.forEach(testCases, function (testCase, callback){

                const testCasePromise = thisTester.runTestCase(commander, testCase);
                testCasePromise.then(function(testCaseResult) {
                    testCase = testCaseResult;

                    callback();
                })

            }, function(err) {
                // callback when all the cases are done.
                resolve(testCases);
            });

        });

    });



};

module.exports = new UnitTester();
