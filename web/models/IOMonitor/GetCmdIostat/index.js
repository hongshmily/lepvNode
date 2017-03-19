
// const path = require('path');
const LepvCommandProto = require('../../LepvCommandProto');

var GetCmdIostatCommander = function() {
    LepvCommandProto.call(this, 'GetCmdIostat');
};

GetCmdIostatCommander.prototype = Object.create(LepvCommandProto.prototype);
GetCmdIostatCommander.prototype.constructor = GetCmdIostatCommander;


// the output of this command is like below:
// "Linux 3.13.0-77-generic (ubuntu) \t03/15/17 \t_x86_64_\t(2 CPU)",
// "",
// "Device:         rrqm/s   wrqm/s     r/s     w/s    rkB/s    wkB/s avgrq-sz avgqu-sz   await r_await w_await  svctm  %util",
// "sda               0.03     0.13    0.53    0.09     9.87     3.56    42.81     0.03   42.71    9.87  232.45   6.55   0.41",
// "",
// ""
GetCmdIostatCommander.prototype.parse = function(lines) {

    var parsedData = {};
    parsedData['parsed'] = {};
    parsedData['parsed']['disks'] = {};

    try {

        // Done by Ting
        var line = lines.shift();
        while( lines.length > 0 && !line.match(/Device:\s+rrqm/)) {
            line = lines.shift();
        }

        if (lines.length == 0) {
            parsedData['parsed']['error'] = 'Failed to locate a header line beginning with "Device: rrqm..."';
            return parsedData;
        }

        var headerColumns = line.trim().split(/\s+/);
        while (lines.length > 0) {
            line = lines.shift().trim();
            if (line == "") {
                continue
            }

            var lineValues = line.split(/\s+/);

            var deviceName = lineValues[0];

            parsedData['parsed']['disks'][deviceName] = {};
            parsedData['parsed']['disks'][deviceName]['rkbs'] = parseFloat(lineValues[5]);
            parsedData['parsed']['disks'][deviceName]['wkbs'] = parseFloat(lineValues[6]);
            parsedData['parsed']['disks'][deviceName]['ratio'] = parseFloat(lineValues[lineValues.length-1]);
        }

    } catch( exception ) {
        parsedData['error'] = exception.message;
    }

    return parsedData;
};

module.exports = new GetCmdIostatCommander();