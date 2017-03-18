
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
    parsedData['parsed']['data'] = [];

    try {

    } catch( exception ) {
        parsedData['error'] = exception.message;
    }

    return parsedData;
};

module.exports = new GetCmdDfCommander();