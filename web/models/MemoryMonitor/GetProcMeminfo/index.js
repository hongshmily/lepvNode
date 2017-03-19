
const LepvCommandProto = require('../../LepvCommandProto');

var GetProcMeminfoCommander = function() {
    LepvCommandProto.call(this, 'GetProcMeminfo');
};

GetProcMeminfoCommander.prototype = Object.create(LepvCommandProto.prototype);
GetProcMeminfoCommander.prototype.constructor = GetProcMeminfoCommander;

GetProcMeminfoCommander.prototype.parse = function(lines) {

    var parsedData = {};
    parsedData['parsed'] = {};

    try {
        // Done by Ting
        var results = {}
        for (var lineIndex = 0; lineIndex < lines.length; lineIndex++) {
            var line = lines[lineIndex];
            var linePairs = line.trim().split(/:\s+/);
            if (linePairs.length < 2) {
                continue;
            }
            var lineKey = linePairs[0].trim();
            var lineValue = linePairs[1].trim();
            results[lineKey] = lineValue;
        }
        parsedData.parsed['name'] = 'memory';
        parsedData.parsed['unit'] = 'MB';
        parsedData.parsed['total'] = (parseInt(results['MemTotal']) / 1024).toFixed(1)
        parsedData.parsed['free'] = (parseInt(results['MemFree']) / 1024).toFixed(1)
        parsedData.parsed['buffers'] = (parseInt(results['Buffers']) / 1024).toFixed(1)
        parsedData.parsed['cached'] = (parseInt(results['Cached']) / 1024).toFixed(1)
        parsedData.parsed['used'] = parsedData.parsed['total'] - parsedData.parsed['free'] - parsedData.parsed['buffers'] - parsedData.parsed['cached']

        var usedRatio = (parsedData.parsed['used'] / parsedData.parsed['total']) * 100
        usedRatio = usedRatio.toFixed(2)
        parsedData.parsed["ratio"] = usedRatio
    } catch( exception ) {
        parsedData['error'] = exception.message;
    }

    return parsedData;
};

module.exports = new GetProcMeminfoCommander();