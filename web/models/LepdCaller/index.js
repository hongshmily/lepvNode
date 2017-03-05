
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
            var dataJson = JSON.parse(dataArray.toString());

            var resultInJson = dataJson.result;

            if (!resultInJson.includes(thisClass.END_STRING)) {
                reject({error: 'The result contains NO LEPD end string'})

            } else {
                resultInJson = resultInJson.replace(thisClass.END_STRING, '');
                var resultLines = resultInJson.split(/\n/);
                resolve(resultLines);
            }

            // kill client after server's response
            client.destroy();
        });
    });
};

LepdCaller.prototype.ping = function(server, callback) {

    var command = 'SayHello';
    this.callCommand(server, command)
        .then (function(lines) {

            if (lines[0].includes('Hello!')) {
                callback({data: {result: true}});
            } else {
                callback({data: {result: false}});
            }
        })
        .catch(function(errors) {
            callback({data: {result: false}, error: errors});
        });
};

module.exports = new LepdCaller();
