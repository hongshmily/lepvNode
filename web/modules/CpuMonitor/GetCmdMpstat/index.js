
// const path = require('path');
const LepvCommandProto = require('../../LepvCommandProto');

var GetCmdMpstatCommander = function() {
    LepvCommandProto.call(this, 'GetCmdMpstat');
};

GetCmdMpstatCommander.prototype = Object.create(LepvCommandProto.prototype);
GetCmdMpstatCommander.prototype.constructor = GetCmdMpstatCommander;


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
GetCmdMpstatCommander.prototype.parse = function(lines) {

    var parsedData = {parsed: {}};
    parsedData['parsed'] = {};

    try {

        var headerLine = '';
        var line = lines.shift();
        while( lines.length > 0 && !line.match(/Average:\s+CPU/)) {
            line = lines.shift()
        }

        if (lines.length == 0) {
            parsedData.parsed['error'] = 'Failed to locate a header line beginning with "Average: CPU..."';
            return parsedData;
        }

        var headerColumns = line.replace(/\s?Average:\s+/, '').trim().split(/\s+/);
        while(lines.length > 0) {
            line = lines.shift();

            if (line.match(/\s?Average:\s+/)) {
                var lineValues = line.replace(/\s?Average:\s+/, '').trim().split(/\s+/);

                var cpuName = lineValues[0];

                parsedData.parsed[cpuName] = {};

                for (var columnIndex = 1; columnIndex < lineValues.length; columnIndex++) {
                    parsedData.parsed[cpuName][headerColumns[columnIndex].replace('%', '')] = parseFloat(lineValues[columnIndex]);
                }
            }
        }

    } catch( exception ) {
        parsedData['error'] = exception.message || exception.error;
    }

    return parsedData;
};

module.exports = new GetCmdMpstatCommander();