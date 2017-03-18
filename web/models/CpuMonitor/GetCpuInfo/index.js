
// const path = require('path');
const LepvCommandProto = require('../../LepvCommandProto');

var GetCpuInfoCommander = function() {
    LepvCommandProto.call(this, 'GetCpuInfo');
};

GetCpuInfoCommander.prototype = Object.create(LepvCommandProto.prototype);
GetCpuInfoCommander.prototype.constructor = GetCpuInfoCommander;

GetCpuInfoCommander.prototype.parse = function(lines) {

    var parsedData = {};
    parsedData['parsed'] = {};

    try {
        for (var lineIndex = 0; lineIndex < lines.length; lineIndex++) {

            if (lines[lineIndex].trim() == '') {
                continue;
            }

            var property = lines[lineIndex].split(':');
            if (property.length != 2) {
                continue;
            }

            parsedData['parsed'][property[0]] = property[1].trim();

            if (property[0] === 'cpunr') {
                parsedData['parsed'][property[0]] = parseInt(property[1].trim());
            }
        }
    } catch( exception ) {
        parsedData['error'] = exception.message;
    }

    return parsedData;
};

module.exports = GetCpuInfoCommander;