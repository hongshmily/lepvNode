
var net = require('net');

var LepdCaller = function() {

    this.END_STRING = 'lepdendstring';
    this.port = 12307;
};

LepdCaller.prototype.callCommand = function(server, command) {

    var thisClass = this;

    return new Promise(function(resolve, reject){

        var client = new net.Socket();

        client.connect(thisClass.port, server, function() {
            client.write('{"method": "' + command + '"}');
        });

        client.on('data', function(dataArray) {

            try {
                var dataJson = JSON.parse(dataArray.toString());
                var resultInJson = dataJson.result;

                resultInJson = resultInJson.replace(thisClass.END_STRING, '');
                var resultLines = resultInJson.split(/\n/);
                resolve(resultLines);

                client.destroy();
            }
            catch (err) {
                reject({error: err.message, rawResponse: dataArray.toString()});
                client.destroy();
            }
        });
    });
};

LepdCaller.prototype.ping = function(server, callback) {

    var command = 'SayHello';
    this.callCommand(server, command)
        .then (function(lines) {

            if (lines[0].includes('Hello!')) {
                callback({data: {result: true}, rawLines: lines});
            } else {
                callback({data: {result: false}, rawLines: lines});
            }
        })
        .catch(function(errors) {
            callback({data: {result: false}, error: errors});
        });
};

LepdCaller.prototype.ListAllMethod = function(server, callback) {

    var command = 'ListAllMethod';
    this.callCommand(server, command)
        .then (function(lines) {

            var line = lines[0].trim();
            var methods = line.split(' ');
            callback({data: methods});
        })
        .catch(function(errors) {
            callback({error: errors});
        });
};

module.exports = new LepdCaller();
