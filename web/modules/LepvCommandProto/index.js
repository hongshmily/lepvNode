
const lepdCaller = require('../LepdCaller');
var pt = require('promise-timeout');

var LepvCommandProto = function(command) {
    this.command = command;

    this.lepdResponseTimeoutInSeconds = 5;
};

LepvCommandProto.prototype.parse = function(resultLines) {

    // parse the result, and return it as an object.
    throw new Error('Each subtype of LepvCommandProto has to override the parse() method');
};

LepvCommandProto.prototype.run = function(options, callback) {

    const thisProto = this;

    const response = {};
    response['data'] = {};

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

            callback(response);
        })
        .catch(function(error) {

            if (error instanceof pt.TimeoutError) {
                response['error'] = "timeout";
            } else {
                response['error'] = error.message || error.error;
            }

            callback(response);
        });

};

module.exports = LepvCommandProto;
