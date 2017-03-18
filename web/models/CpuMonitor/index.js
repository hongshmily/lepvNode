
const lepdCaller = require('../LepdCaller');

const GetCpuInfoCommander = require('./GetCpuInfo');

const CpuMonitor = function() {
};

CpuMonitor.prototype.getProcessorCount = function(options, callback) {

    const getCpuInfoCommander = new GetCpuInfoCommander();
    getCpuInfoCommander.run(options, function(response) {

        if ('cpunr' in response.data) {
            response['data']['count'] = response['data']['cpunr'];
        } else {
            response['error'] = 'Failed to locate "cpunr" in the response';
        }

        callback(response);

    });
};

CpuMonitor.prototype.GetCmdTop = function(options, callback) {

    var thisMonitor = this;
    var command = 'GetCmdTop';

    var maxDataCount = 25;
    if (options && options.maxCount) {
        maxDataCount = options.maxCount;
    }

    var server = null;
    if (options && options.server) {
        server = options.server;
    }

    var response = {};
    response['data'] = [];
    lepdCaller.callCommand(server, command, options.mockData)
        .then (function(lines) {

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

            for (var rowIndex = 0; rowIndex < maxDataCount && rowIndex < lines.length; rowIndex++) {
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
        .catch(function(error) {
            response['error'] = error.message;
            callback(response);
        });
};

CpuMonitor.prototype.GetAverageLoad = function(options, callback) {

    var thisMonitor = this;
    var command = 'GetProcLoadavg';

    var response = {};
    response['data'] = {};
    lepdCaller.callCommand(options.server, command)
        .then (function(lines) {

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
        .catch(function(error) {
            response['error'] = error.message;
            callback(response);
        });
};

CpuMonitor.prototype.GetProcCpuinfo = function(options, callback) {

    var thisMonitor = this;
    var command = 'GetProcCpuinfo';

    var response = {};
    response['data'] = {};
    lepdCaller.callCommand(options.server, command)
        .then (function(lines) {

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
        .catch(function(error) {
            response['error'] = error.message;
            callback(response);
        });
};

CpuMonitor.prototype.GetCapacity = function(options, callback) {

    // TODO:
    this.GetProcCpuinfo(options, callback);
};

// the output of this command is like below:
//
// "07:40:44 all 0.00 0.00 0.50 0.00 0.00 0.50 0.00 0.00 0.00 99.00",
// "07:40:44 0 0.00 0.00 0.00 0.00 0.00 0.00 0.00 0.00 0.00 100.00",
// "07:40:44 1 0.00 0.00 0.00 0.00 0.00 0.99 0.00 0.00 0.00 99.01",
// "",
// "Average: CPU %usr %nice %sys %iowait %irq %soft %steal %guest %gnice %idle",
// "Average: all 0.00 0.00 0.50 0.00 0.00 0.50 0.00 0.00 0.00 99.00",
// "Average: 0 0.00 0.00 0.00 0.00 0.00 0.00 0.00 0.00 0.00 100.00",
// "Average: 1 0.00 0.00 0.00 0.00 0.00 0.99 0.00 0.00 0.00 99.01"
//
// we parse the "Average" lines.
CpuMonitor.prototype.GetCmdMpstat = function(options, callback) {

    var thisMonitor = this;
    var command = 'GetCmdMpstat';

    var response = {};
    response['data'] = {};
    lepdCaller.callCommand(options.server, command)
        .then (function(lines) {

            if (options.debug == true || options.debug == 'true') {
                response['rawLines'] = lines.slice();
                response['command'] = command;
            }

            // TODO:
            var headerLine = '';
            var line = lines.shift();
            while( lines.length > 0 && !line.match(/Average:\s+CPU/)) {
                line = lines.shift()
            }

            if (lines.length == 0) {
                response['error'] = 'Failed to locate a header line beginning with "Average: CPU..."';
                callback(response);
            }

            var headerColumns = line.replace(/\s?Average:\s+/, '').trim().split(/\s+/);
            while(lines.length > 0) {
                line = lines.shift();

                if (line.match(/\s?Average:\s+/)) {
                    var lineValues = line.replace(/\s?Average:\s+/, '').trim().split(/\s+/);

                    var cpuName = lineValues[0];

                    response['data'][cpuName] = {};

                    for (var columnIndex = 1; columnIndex < lineValues.length; columnIndex++) {
                        response['data'][cpuName][headerColumns[columnIndex].replace('%', '')] = parseFloat(lineValues[columnIndex]);
                    }
                }
            }

            callback(response);
        })
        .catch(function(error) {
            response['error'] = error.message;
            callback(response);
        });
};


module.exports = new CpuMonitor();
