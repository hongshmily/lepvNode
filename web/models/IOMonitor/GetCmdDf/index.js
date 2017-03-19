
// const path = require('path');
const LepvCommandProto = require('../../LepvCommandProto');

var GetCmdDfCommander = function() {
    LepvCommandProto.call(this, 'GetCmdDf');
};

GetCmdDfCommander.prototype = Object.create(LepvCommandProto.prototype);
GetCmdDfCommander.prototype.constructor = GetCmdDfCommander;

GetCmdDfCommander.prototype.parse = function(lines) {

    var parsedData = {};
    parsedData['parsed'] = {};
    parsedData['parsed']['disks'] = {};

    try {
        // Done by Ting
        for (var lineIndex = 0; lineIndex < lines.length; lineIndex++) {
            var line = lines[lineIndex].trim();
            if (!line.startsWith('/dev/')) {
                continue
            }
            var lineValues = line.split(/\s+/);
            var diskName = lineValues[0].slice(5);
            parsedData['parsed']['disks'][diskName] = {}
            parsedData['parsed']['disks'][diskName]['size'] = lineValues[1]
            parsedData['parsed']['disks'][diskName]['used'] = lineValues[2]
            parsedData['parsed']['disks'][diskName]['free'] = lineValues[3]
            parsedData['parsed']['diskTotal'] += parsedData['parsed']['disks'][diskName]['size']
            parsedData['parsed']['diskUsed'] += parsedData['parsed']['disks'][diskName]['used']
        }
    } catch( exception ) {
        parsedData['error'] = exception.message;
    }

    return parsedData;
};

module.exports = new GetCmdDfCommander();