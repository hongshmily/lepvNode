
// const path = require('path');
const LepvCommandProto = require('../../LepvCommandProto');

var GetProCpuinfoCommander = function() {
    LepvCommandProto.call(this, 'GetProcCpuinfo');
};

GetProCpuinfoCommander.prototype = Object.create(LepvCommandProto.prototype);
GetProCpuinfoCommander.prototype.constructor = GetProCpuinfoCommander;

GetProCpuinfoCommander.prototype.parse = function(lines) {

    var parsedData = {parsed: {}};

    try {

        parsedData.parsed['processors'] = {};

        var processorId = null;
        while(lines.length > 0) {
            var line = lines.shift().trim();

            if (line == '') {
                continue;
            }

            if (line.match(/processor\s?:\s?\d/)) {
                var reg = line.match(/processor\s?:\s?(\d+)/);
                processorId = reg[1].trim();

                parsedData.parsed['processors'][processorId] = {};
                continue;
            }

            var keyValuePair = line.split(':');
            if (keyValuePair.length == 2) {
                parsedData.parsed['processors'][processorId][keyValuePair[0].trim()] = keyValuePair[1].trim();
            }
        }


    } catch( exception ) {
        parsedData['error'] = exception.message;
    }

    return parsedData;
};

module.exports = new GetProCpuinfoCommander();