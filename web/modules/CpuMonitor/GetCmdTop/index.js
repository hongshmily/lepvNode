
// const path = require('path');
const LepvCommandProto = require('../../LepvCommandProto');

var GetCmdTopCommander = function() {
    LepvCommandProto.call(this, 'GetCmdTop');
};

GetCmdTopCommander.prototype = Object.create(LepvCommandProto.prototype);
GetCmdTopCommander.prototype.constructor = GetCmdTopCommander;

GetCmdTopCommander.prototype.parse = function(lines, maxDataCount) {

    var parsedData = {};
    parsedData['parsed'] = {};
    parsedData['parsed']['rows'] = [];

    maxDataCount = maxDataCount || 25;

    try {

        // method specific method here
        var headerLine = lines.shift();
        while ( !headerLine.match(/\s?PID\s+USER\s+/) ) {
            headerLine = lines.shift();
        }

        if (headerLine.match(/\s?PID\s+USER\s+PR\s+/)) {
            parsedData['parsed']['os'] = 'android';
        } else if (headerLine.match(/\s*PID\s+USER\s+PRI\s+NI\s+VSZ\s+RSS\s+/)) {
            parsedData['parsed']['os'] = 'linux';
        } else {
            parsedData['parsed']['os'] = 'unrecognized';
        }

        parsedData['parsed']['headerline'] = headerLine.trim();

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

            parsedData['parsed']['rows'].push(rowData);
        }

    } catch( exception ) {
        parsedData['error'] = exception.message;
    }

    return parsedData;
};

module.exports = new GetCmdTopCommander();