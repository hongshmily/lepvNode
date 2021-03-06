
const net = require('net');
const Promise = require('bluebird');

const LepdCaller = function() {

    this.END_STRING = 'lepdendstring';
    this.port = 12307;
};

LepdCaller.prototype.mockCallCommand = function(mockData) {

    const thisClass = this;

    return new Promise(function(resolve, reject){

        try {

            const resultLines = mockData.replace(thisClass.END_STRING, '').split(/\\n|\n/);
            resolve(resultLines);


        } catch( err ) {
            reject({error: err.message, rawResponse: mockData});
        }

    });
};

LepdCaller.prototype.callCommand = function(server, command, mockData) {

    const thisClass = this;

    if (mockData) {
        return this.mockCallCommand(mockData);
    }

    return new Promise(function(resolve, reject){

        const client = new net.Socket();

        var resultLines;

        // caches all the uint8arrays received here.
        var dataArraysReceived = [];
        var charCountsReceived = 0;

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

            // what happens for large array in JS
            // http://stackoverflow.com/questions/1374126/how-to-extend-an-existing-javascript-array-with-another-array-without-creating

            dataArraysReceived.push(dataArray);
            charCountsReceived += dataArray.length;

            // the string should end with '"\n}', whose ASCII codes are "34, 10, 125"
            // BUT, sometimes there is an additional "\n" after }, so it ends with "34, 10, 125, 10"
            const lastCharsReceived = dataArray.slice(-4).join('-');
            if (/34-10-125[-10]?/.test(lastCharsReceived)) {

                var charsReceived = new (dataArray.constructor)(charCountsReceived);

                var appendIndex = 0;

                for (var arrayIndex = 0; arrayIndex < dataArraysReceived.length; arrayIndex++) {

                    charsReceived.set(dataArraysReceived[arrayIndex], appendIndex);
                    appendIndex += dataArraysReceived[arrayIndex].length;
                }

                try {
                    const resultInJson = JSON.parse(charsReceived.toString()).result.replace(thisClass.END_STRING, '');
                    resultLines = resultInJson.split(/\n|\\n/);

                    client.destroy();

                } catch( err ) {

                    console.log("The data received is invalid " + err);
                    reject({error: err.message, rawResponse: charsReceived.toString()});
                }
            }
        });

        client.on('close', function() {
            resolve(resultLines);
            // console.log("Connection closed to " + server + " with command: " + command);
        });

        client.on('error', function(err) {
            reject({error: err.message});
            // console.log("Connection error: " + err + " for server " + server+ " with command: " + command);
        });
    });
};

LepdCaller.prototype.ping = function(server, callback) {

    const command = 'SayHello';
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

LepdCaller.prototype.ListAllMethod = function(server) {

    const thisClass = this;
    return new Promise(function(resolve, reject){

        try {

            const command = 'ListAllMethod';
            thisClass.callCommand(server, command)
                .then (function(lines) {

                    var line = lines[0].trim();
                    var methods = line.split(' ');
                    resolve({data: methods});
                })
                .catch(function(errors) {
                    resolve({error: errors});
                });


        } catch( err ) {
            reject({error: err.message});
        }

    });

};

module.exports = new LepdCaller();
