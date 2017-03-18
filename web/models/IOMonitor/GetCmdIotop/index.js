
// const path = require('path');
const LepvCommandProto = require('../../LepvCommandProto');

var GetCmdIotopCommander = function() {
    LepvCommandProto.call(this, 'GetCmdIotop');
};

GetCmdIotopCommander.prototype = Object.create(LepvCommandProto.prototype);
GetCmdIotopCommander.prototype.constructor = GetCmdIotopCommander;

GetCmdIotopCommander.prototype.parse = function(lines) {

    var parsedData = {};
    parsedData['parsed'] = {};

    try {

        // TODO: parse the lines here

    } catch( exception ) {
        parsedData['error'] = exception.message;
    }

    return parsedData;
};

module.exports = new GetCmdIotopCommander();