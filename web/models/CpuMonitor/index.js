
var lepdCaller = require('../LepdCaller');

var CpuMonitor = function() {
};

CpuMonitor.prototype.GetCpuCount = function(options, callback) {

    var thisMonitor = this;
    var command = 'GetCpuInfo';

    lepdCaller.callCommand(options.server, command)
        .then (function(lines) {
            var response = {};

            if (options.debug == true || options.debug == 'true') {
                response['rawLines'] = lines.splice();
                response['command'] = command;
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
                response['command'] = command;
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

CpuMonitor.prototype.GetAverageLoad = function(options, callback) {

    var thisMonitor = this;
    var command = 'GetProcLoadavg';

    lepdCaller.callCommand(options.server, command)
        .then (function(lines) {

            var response = {};
            response['data'] = {};

            if (options.debug == true || options.debug == 'true') {
                response['rawLines'] = lines.slice();
                response['command'] = command;
            }

            // method specific method here
            var loadDatas = lines[0].split(" ");

            // # '0.00 0.01 0.05 1/103 24750
            // # 'avg system load of 1 minute ago, 5 minutes ago, 15 minutes ago,
            // # the fourth is A/B, A is the number of running processes
            // # B is the total process count.
            // # last number, like 24750 is the ID of the most recently running process.
            response['data']['last1'] = parseFloat(loadDatas[0]);
            response['data']['last5'] = parseFloat(loadDatas[1]);
            response['data']['last15'] = parseFloat(loadDatas[2]);

            callback(response);
        })
        .catch(function(errors) {
            callback({error: errors});
        });
};

CpuMonitor.prototype.GetConfig = function(options, callback) {

    var thisMonitor = this;
    var command = 'GetProcCpuinfo';

    lepdCaller.callCommand(options.server, command)
        .then (function(lines) {

            var response = {};
            response['data'] = {};

            if (options.debug == true || options.debug == 'true') {
                response['rawLines'] = lines.slice();
                response['command'] = command;
            }

            response['data']['processors'] = {};

            var processorId = null;
            while(lines.length > 0) {
                var line = lines.shift().trim();

                if (line == '') {
                    continue;
                }

                if (line.match(/processor\s?:\s?\d/)) {
                    var reg = line.match(/processor\s?:\s?(\d+)/);
                    processorId = reg[1].trim();

                    response['data']['processors'][processorId] = {};
                    continue;
                }

                var keyValuePair = line.split(':');
                if (keyValuePair.length == 2) {
                    response['data']['processors'][processorId][keyValuePair[0].trim()] = keyValuePair[1].trim();
                }
            }

            callback(response);
        })
        .catch(function(errors) {
            callback({error: errors});
        });
};

CpuMonitor.prototype.GetProcCpuinfo = function(options, callback) {

    var thisMonitor = this;
    var command = 'GetProcCpuinfo';

    lepdCaller.callCommand(options.server, command)
        .then (function(lines) {

            var response = {};
            response['data'] = {};

            if (options.debug == true || options.debug == 'true') {
                response['rawLines'] = lines.slice();
                response['command'] = command;
            }

            // TODO:

            callback(response);
        })
        .catch(function(errors) {
            callback({error: errors});
        });
};

CpuMonitor.prototype.GetCmdMpstat = function(options, callback) {

    var thisMonitor = this;
    var command = 'GetCmdMpstat';

    lepdCaller.callCommand(options.server, command)
        .then (function(lines) {

            var response = {};
            response['data'] = {};

            if (options.debug == true || options.debug == 'true') {
                response['rawLines'] = lines.slice();
                response['command'] = command;
            }

            // TODO:

            callback(response);
        })
        .catch(function(errors) {
            callback({error: errors});
        });
};


module.exports = new CpuMonitor();
