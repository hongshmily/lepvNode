
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

    } catch( exception ) {
        parsedData['error'] = exception.message;
    }

    return parsedData;
};

module.exports = new GetProcMeminfoCommander();