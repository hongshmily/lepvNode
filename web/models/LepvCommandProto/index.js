
const lepdCaller = require('../LepdCaller');

var LepvCommandProto = function(command) {
    this.command = command;

    this.unittestFilePath = null;
};

LepvCommandProto.prototype.parse = function(resultLines) {

    // parse the result, and return it as an object.
    throw new Error('Each subtype of LepvCommandProto has to override the parse() method');
};

LepvCommandProto.prototype.run = function(options, callback) {

    var thisProto = this;

    var response = {};
    response['data'] = {};
    lepdCaller.callCommand(options.server, thisProto.command, options.mockData)
        .then (function(lines) {

            if (options.debug == true || options.debug == 'true') {
                response['rawLines'] = lines.slice();
                response['command'] = thisProto.command;
            }

            var parsedData = thisProto.parse(lines);
            response['data'] = parsedData['parsed'];
            response['error'] = parsedData['error'];

            callback(response);
        })
        .catch(function(error) {
            response['error'] = error.message || error.error;
            callback(response);
        });
};

module.exports = LepvCommandProto;
