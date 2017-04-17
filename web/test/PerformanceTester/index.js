
const assert = require('assert');
const async = require('async');
const convertHrtime = require('convert-hrtime');

const logger = require('../../modules/Logger');

let PerformanceTester = function() {

    this.options = {
        server: 'www.linuxxueyuan.com',
        debug: true
    };

    this.monitorLocations = [
        '../../modules/CpuMonitor',
        '../../modules/MemoryMonitor',
        '../../modules/IOMonitor',
        '../../modules/PerfMonitor'
    ];

    this.commanders = {};
    for (let i = 0; i < this.monitorLocations.length; i++) {
        const monitor = require(this.monitorLocations[i]);

        this.commanders = Object.assign(this.commanders, monitor.socketMessages);
    }
};

PerformanceTester.prototype.runCommandsAsyncRepeatedly = function(commanderNames, repeatTimes, allDoneCallback) {

    const thisTester = this;

    async.series([

        thisTester.runCommandsAsync(commanderNames, function (stat) {
            console.log("Iteration 1 done!")
        }),

        thisTester.runCommandsAsync(commanderNames, function (stat) {
            console.log("Iteration 2 done!")
        }),

        thisTester.runCommandsAsync(commanderNames, function (stat) {
            console.log("Iteration 3 done!")
        })

    ], function(err, results) {
        console.log('All Done!');
    })

};

PerformanceTester.prototype.runCommandsAsync = function(commanderNames, allDoneCallback) {

    const thisTester = this;

    const commandCount = commanderNames.length;

    let timeHistory = [];
    let totalTime = 0;
    let longestTime = 0;
    let shortestTime = null;

    async.forEachLimit(commanderNames, commandCount, function(commandName, commanderDone) {

        thisTester.runCommand(commandName, function(stat) {

            commanderDone();
        });

    }, function(err) {
        logger.log("All done");
    });

};

PerformanceTester.prototype.runCommandsOneByOne = function(commanderNames) {

    const thisTester = this;

    async.forEachLimit(commanderNames, 1, function(commanderName, commanderDone) {

        thisTester.runCommand(commanderName, commanderDone);

    }, function(err) {
        logger.log("All done");
    });

};

PerformanceTester.prototype.runAllSupportedCommandsOneByOne = function(callback) {

    const thisTester = this;

    const allSupportedCommands = [
        'cpu.avgload',
        'cpu.count',
        'cpu.top',
        'cpu.status',

        'io.top',
        'io.status',
        'io.capacity',

        'memory.procrank',
        'memory.status',
        'memory.capacity',

        'perf.cpuclock'
    ];

    const timeStats = {};
    async.forEachLimit(allSupportedCommands, 1, function(commanderName, commanderDone) {

        thisTester.runCommand(commanderName, function(timeUsed) {
            timeStats[commanderName] = timeUsed;
            commanderDone();
        });

    }, function(err) {
        if (err) {
            console.log(err);
        }

        callback(timeStats);
    });

};

PerformanceTester.prototype.runCommandRepeatedly = function(commanderName, repeatTimes, allDoneCallback) {

    const thisTester = this;

    const commanderNames = [];
    while(repeatTimes-- > 0) {
        commanderNames.push(commanderName);
    }

    let timeHistory = [];
    let totalTime = 0;
    let longestTime = 0;
    let shortestTime = null;
    async.forEachLimit(commanderNames, 1, function(commanderName, commanderDone) {

        thisTester.runCommand(commanderName, function(elapsedTime) {

            timeHistory.push(elapsedTime);

            totalTime += elapsedTime;

            if (elapsedTime > longestTime) {
                longestTime = elapsedTime;
            } else if (shortestTime === null || elapsedTime < shortestTime) {
                shortestTime = elapsedTime;
            }

            commanderDone();
        });

    }, function(err) {

        if (allDoneCallback) {
            allDoneCallback(
                {
                    repeated: commanderNames.length,
                    history: timeHistory,
                    average: totalTime / commanderNames.length,
                    fastest: shortestTime,
                    slowest: longestTime,
                    unit: 'seconds'
                }
            );
        }
    });

};

PerformanceTester.prototype.runCommand = function(commanderName, callback) {

    const commander = this.commanders[commanderName];

    const startTime = process.hrtime();

    const promise = commander(this.options);
    promise.then(function(response) {
        logger.debug(commanderName + " succeeded.");
    }).catch(function(err) {

        logger.debug(commanderName + " failed.");
    }).finally(function() {
        const timeUsed = convertHrtime(process.hrtime(startTime));

        const timeUsedInSecond = timeUsed.s.toFixed(2);

        logger.debug(commanderName + " = " + timeUsedInSecond + ' seconds');

        if (callback) {
            callback(timeUsedInSecond);
        }
    });
};

module.exports = new PerformanceTester();
