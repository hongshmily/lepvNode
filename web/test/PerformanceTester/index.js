
const assert = require('assert');

const winston = require('winston');
const tsFormat = () => (new Date()).toLocaleTimeString();
const logger = new (winston.Logger)({
    transports: [
        // colorize the output to the console
        new (winston.transports.Console)({
            timestamp: tsFormat,
            colorize: true
        })
    ]
});
logger.level = 'debug';


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

PerformanceTester.prototype.run = function(commanderName) {

    const commander = this.commanders[commanderName];
    const promise = commander(this.options);
    promise.then(function(response) {
       logger.debug(response);
    });

};

module.exports = new PerformanceTester();
