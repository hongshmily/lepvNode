
const assert = require('assert');
const fs = require('fs');
const async = require('async');
const diff = require('deep-diff').diff;
const Promise = require('bluebird');

const lepUtil = require('../../modules/Utility');
const chai = require('chai');
const expect = chai.expect;

var UnitTester = function() {
};


UnitTester.prototype.validate = function(expectedObject, actualObject) {

    for (var key in expectedObject) {
        if (!expectedObject.hasOwnProperty(key)) {
            continue;
        }

        expect(actualObject).have.property(key);

        // make sure the response has same field.
        expect(actualObject).have.property(key);

        if (expectedObject[key] instanceof Object) {

            this.validate(expectedObject[key], actualObject[key]);

        } else {

            // TODO:
            // Implement a logic to collect ALL assert failures before finish.
            // so we don't stop on the first failure, we stop on all failures are caught.

            // TODO:
            // custom message for the assertion failures.

            // TODO:
            // Need a way to show the "path" of a property being validated, rather than just a key
            // because it is hard to tell which data does not match from just the "key".
            expect(expectedObject[key]).to.equal(actualObject[key]);

        }
    }
};

UnitTester.prototype.run = function(commander, testDataFile) {

    const thisTester = this;

    const commandName = commander.command;

    let fileContents = fs.readFileSync(testDataFile, 'utf8');
    const testCases = JSON.parse(fileContents).cases;

    describe(commandName, function() {

        for (let i = 0; i < testCases.length; i++ ) {

            const testCase = testCases[i];

            const testCaseName = testCase.cpu + " " + testCase.os + "; " + testCase.note;

            it(testCaseName, function(testCaseDone) {

                const options = {
                    debug: true,
                    mockData: testCase.lepdResult
                };

                const runPromise = commander.run(options);
                runPromise.then(function(actual) {

                    lepUtil.printJson(actual);
                    const expected = testCase.expected;

                    thisTester.validate(expected, actual);



                    testCaseDone();
                });

            })
        }


    });

};

module.exports = new UnitTester();
