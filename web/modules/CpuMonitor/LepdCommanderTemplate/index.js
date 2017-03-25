
const LepvCommandProto = require('../../LepvCommandProto');

var XXXLepdCommandNameXXXCommander = function() {
    LepvCommandProto.call(this, 'XXXLepdCommandNameXXX');
};

XXXLepdCommandNameXXXCommander.prototype = Object.create(LepvCommandProto.prototype);
XXXLepdCommandNameXXXCommander.prototype.constructor = XXXLepdCommandNameXXXCommander;

XXXLepdCommandNameXXXCommander.prototype.parse = function(lines) {

    var parsedData = {};
    parsedData['parsed'] = {};

    try {

    } catch( exception ) {
        parsedData['error'] = exception.message;
    }

    return parsedData;
};

module.exports = new XXXLepdCommandNameXXXCommander();