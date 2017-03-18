
const LepvCommandProto = require('../../LepvCommandProto');

var GetCmdProcrankCommander = function() {
    LepvCommandProto.call(this, 'GetCmdProcrank');
};

GetCmdProcrankCommander.prototype = Object.create(LepvCommandProto.prototype);
GetCmdProcrankCommander.prototype.constructor = GetCmdProcrankCommander;

GetCmdProcrankCommander.prototype.parse = function(lines) {

    var parsedData = {};
    parsedData['parsed'] = {};

    try {

    } catch( exception ) {
        parsedData['error'] = exception.message;
    }

    return parsedData;
};

module.exports = new GetCmdProcrankCommander();