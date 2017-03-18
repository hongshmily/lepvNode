
// const path = require('path');
const LepvCommandProto = require('../../LepvCommandProto');

var GetProcLoadavgCommander = function() {
    LepvCommandProto.call(this, 'GetProcLoadavg');
};

GetProcLoadavgCommander.prototype = Object.create(LepvCommandProto.prototype);
GetProcLoadavgCommander.prototype.constructor = GetProcLoadavgCommander;

GetProcLoadavgCommander.prototype.parse = function(lines) {

    var parsedData = {};
    parsedData['parsed'] = {};

    try {

        // method specific method here
        var loadDatas = lines[0].split(" ");

        // # '0.00 0.01 0.05 1/103 24750
        // # 'avg system load of 1 minute ago, 5 minutes ago, 15 minutes ago,
        // # the fourth is A/B, A is the number of running processes
        // # B is the total process count.
        // # last number, like 24750 is the ID of the most recently running process.
        parsedData['parsed']['last1'] = parseFloat(loadDatas[0]);
        parsedData['parsed']['last5'] = parseFloat(loadDatas[1]);
        parsedData['parsed']['last15'] = parseFloat(loadDatas[2]);

    } catch( exception ) {
        parsedData['error'] = exception.message;
    }

    return parsedData;
};

module.exports = new GetProcLoadavgCommander();