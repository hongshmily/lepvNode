
var net = require('net');

var LepdCaller = function() {

    this.END_STRING = 'lepdendstring';
    this.port = 12307;

};

LepdCaller.prototype.mockCallCommand = function(mockData) {

    var thisClass = this;

    return new Promise(function(resolve, reject){

        try {

            mockData = mockData.replace(thisClass.END_STRING, '');

            var resultLines = mockData.split(/\\n|\n/);
            resolve(resultLines);


        } catch( err ) {
            reject({error: err.message, rawResponse: mockData});
        }

    });
};

LepdCaller.prototype.callCommand = function(server, command, mockData) {

    var thisClass = this;

    if (mockData) {
        return this.mockCallCommand(mockData);
    }

    return new Promise(function(resolve, reject){

        var client = new net.Socket();
        var charsReceived = [];
        var dataJson = null;

        if(!server) {
            reject({error: 'server not specified!'});
        }

        client.connect(thisClass.port, server, function() {
            client.write('{"method": "' + command + '"}');
        });

        client.on('data', function(dataArray) {

            // http://stackoverflow.com/questions/17312242/node-js-net-library-getting-complete-data-from-data-event#comment25133735_17313295
            // You shouldn't do anything with the data you recieve, until you receive the end event. The end callback means that all data chunks
            // have been sent through the stream to your callbacks. If data comes in more than one chunk, you need to create a variable within
            // your function closure to store this data to. Most programs can work just fine ignoring this fact, because data usually comes
            // across in one chunk. But sometimes it doesn't. It doesn't even necessarily depend on the amount of data.
            // If you're in a situation where this is happening,

            try {
                charsReceived = charsReceived.concat(dataArray);
                dataJson = JSON.parse(charsReceived.toString());

                var resultInJson = dataJson.result;

                resultInJson = resultInJson.replace(thisClass.END_STRING, '');
                var resultLines = resultInJson.split(/\n|\\n/);
                resolve(resultLines);

                try {
                    client.destroy();
                } catch (err) {
                    console.log(err);
                }


            } catch( err ) {
                if (err.message != 'Unexpected end of JSON input') {
                    reject({error: err.message, rawResponse: dataArray.toString()});
                    client.destroy();
                }
            }

        });

    });
};

LepdCaller.prototype.ping = function(server, callback) {

    var command = 'SayHello';
    this.callCommand(server, command)
        .then (function(lines) {

            if (lines[0].includes('Hello!')) {
                callback({data: {connected: true}, rawLines: lines});
            } else {
                callback({data: {connected: false}, rawLines: lines});
            }
        })
        .catch(function(errors) {
            callback({data: {connected: false}, error: errors});
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
