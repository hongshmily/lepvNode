
const LepvCommandProto = require('../../LepvCommandProto');

var GetCmdPerfCpuclockCommander = function() {
    LepvCommandProto.call(this, 'GetCmdPerfCpuclock');
};

GetCmdPerfCpuclockCommander.prototype = Object.create(LepvCommandProto.prototype);
GetCmdPerfCpuclockCommander.prototype.constructor = GetCmdPerfCpuclockCommander;

GetCmdPerfCpuclockCommander.prototype.parse = function(lines) {

    var parsedData = {};
    parsedData['parsed'] = {};

    try {

    } catch( exception ) {
        parsedData['error'] = exception.message;
    }

    return parsedData;
};

module.exports = new GetCmdPerfCpuclockCommander();