
var net = require('net');

var LepdCaller = function() {

    this.END_STRING = 'lepdendstring';
    this.port = 12307;
};

LepdCaller.prototype.callCommand = function(server, command, callback) {

    var thisClass = this;

    var client = new net.Socket();

    client.connect(thisClass.port, server, function() {
        client.write('{"method": "' + command + '"}');
    });

    client.on('data', function(dataArray) {
        var dataJson = JSON.parse(dataArray.toString());

        var resultInJson = dataJson.result;

        if (!resultInJson.includes(thisClass.END_STRING)) {
            console.log("The result contains NO LEPD end string");
        }
        resultInJson = resultInJson.replace(thisClass.END_STRING, '');
        var resultLines = resultInJson.split(/\n/);
        callback(resultLines);
        client.destroy(); // kill client after server's response
    });
};

module.exports = new LepdCaller();
