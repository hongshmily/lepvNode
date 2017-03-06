
var lepdCaller = require('../LepdCaller');

var CpuMonitor = function() {
};

CpuMonitor.prototype.GetProcCpuinfo = function(server, callback) {

    var command = 'GetProcCpuinfo';
    lepdCaller.callCommand(server, command, function(lines) {
        callback(lines);
    });
};

CpuMonitor.prototype.GetCpuCount = function(options, callback) {

    var thisMonitor = this;
    var command = 'GetCpuInfo';

    lepdCaller.callCommand(options.server, command)
        .then (function(lines) {
            var response = {};

            if (options.debug == true || options.debug == 'true') {
                response['rawLines'] = lines.splice();
            }

            response['data'] = {};
            for (var lineIndex = 0; lineIndex < lines.length; lineIndex++) {

                var line = lines[lineIndex];
                if (line.startsWith('cpunr')) {
                    response['data']['count'] = parseInt(line.split(':')[1].trim());
                    break;
                }
            }

            if (!response['data']['count']) {
                response['error'] = 'Failed in getting processor count by GetCpuInfo';
            }

            callback(response);
        })
        .catch(function(errors) {
            callback({error: errors});
        });
};


CpuMonitor.prototype.GetXXX = function(options, callback) {

    var thisMonitor = this;
    var command = 'GetCmdTop';

    lepdCaller.callCommand(options.server, command)
        .then (function(lines) {

            var response = {};
            response['data'] = {};

            if (options.debug == true || options.debug == 'true') {
                response['rawLines'] = lines.splice();
            }

            // method specific method here


            callback(response);
        })
        .catch(function(errors) {
            callback({error: errors});
        });
};

CpuMonitor.prototype.GetCmdTop = function(options, callback) {

    var thisMonitor = this;
    var command = 'GetCmdTop';

    var maxDataCount = 25;
    if (options.maxCount) {
        maxDataCount = options.maxCount;
    }

    lepdCaller.callCommand(options.server, command)
        .then (function(lines) {

            var response = {};
            response['data'] = [];

            if (options.debug == true || options.debug == 'true') {
                response['rawLines'] = lines.slice();
            }

            // method specific method here
            var headerLine = lines.shift();
            while ( !headerLine.match(/\s?PID\s+USER\s+/) ) {
                headerLine = lines.shift();
            }

            if (headerLine.match(/\s?PID\s+USER\s+PR\s+/)) {
                response['os'] = 'android';
            } else if (headerLine.match(/\s*PID\s+USER\s+PRI\s+NI\s+VSZ\s+RSS\s+/)) {
                response['os'] = 'linux';
            } else {
                response['os'] = 'unrecognized';
            }

            var headerColumns = headerLine.trim().split(/\s+/);

            for (var rowIndex = 0; rowIndex < maxDataCount; rowIndex++) {
                var columnValues = lines[rowIndex].trim().split(/\s+/);

                var rowData = {};
                rowData['ranking'] = rowIndex; // this is how keep the ordering of the rows

                for (var columnIndex = 0; columnIndex < headerColumns.length; columnIndex++) {
                    var columnName = headerColumns[columnIndex];

                    if (columnName == 'Name' || columnName == "CMD") {
                        rowData[columnName] = columnValues.slice(columnIndex).join(' ');
                    } else {
                        rowData[columnName] = columnValues[columnIndex];
                    }

                }

                console.log(headerLine);
                console.log(lines[rowIndex]);
                console.log(rowData);

                response['data'].push(rowData);
            }

            callback(response);
        })
        .catch(function(errors) {
            callback({error: errors});
        });
};


module.exports = new CpuMonitor();
