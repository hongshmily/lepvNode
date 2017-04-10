
const Promise = require('bluebird');

const lepdCaller = require('../LepdCaller');
const pt = require('promise-timeout');

var LepvCommandProto = function(command, timeout) {
    this.command = command;

    this.lepdResponseTimeoutInSeconds = timeout || 10;
};

LepvCommandProto.prototype.parse = function(resultLines) {

    // parse the result, and return it as an object.
    throw new Error('Each subtype of LepvCommandProto has to override the parse() method');
};

LepvCommandProto.prototype.run = function(options) {

    const thisProto = this;

    const response = {};
    response['data'] = {};

    return new Promise(function(resolve, reject){

        const callerPromise = lepdCaller.callCommand(options.server, thisProto.command, options.mockData);

        pt.timeout(callerPromise, thisProto.lepdResponseTimeoutInSeconds * 1000)
            .then (function(lines) {

                if (options.debug == true || options.debug == 'true') {
                    response['rawLines'] = lines.slice();
                    response['command'] = thisProto.command;
                }

                const parsedData = thisProto.parse(lines);
                response['data'] = parsedData['parsed'];
                response['error'] = parsedData['error'];

                resolve(response);
            })
            .catch(function(error) {

                if (error instanceof pt.TimeoutError) {
                    response['error'] = "timeout after " + thisProto.lepdResponseTimeoutInSeconds + " seconds";
                } else {
                    response['error'] = error.message || error.error;
                }

                resolve(response);
            });

    });

};

module.exports = LepvCommandProto;
