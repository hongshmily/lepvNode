
// const path = require('path');
const LepvCommandProto = require('../../LepvCommandProto');
const lepvUtil = require('../../Utility');

var GetCmdDfCommander = function() {
    LepvCommandProto.call(this, 'GetCmdDf');
};

GetCmdDfCommander.prototype = Object.create(LepvCommandProto.prototype);
GetCmdDfCommander.prototype.constructor = GetCmdDfCommander;

// "Filesystem                Size      Used Available Use% Mounted on",
// "udev                    114.1M     12.0K    114.1M   0% /dev",
// "tmpfs                    23.8M    332.0K     23.5M   1% /run",
// "/dev/disk/by-label/cloudimg-rootfs",
// "                          2.1G    870.6M      1.2G  42% /",
// "none                      4.0K         0      4.0K   0% /sys/fs/cgroup",
// "none                      5.0M         0      5.0M   0% /run/lock",
// "none                    119.0M         0    119.0M   0% /run/shm",
// "none                    100.0M         0    100.0M   0% /run/user",
GetCmdDfCommander.prototype.parse = function(lines) {

    var parsedData = {};
    parsedData['parsed'] = {};
    parsedData['parsed']['disks'] = {};

    try {
        // TODO: need the header line?
        const headerLine = lines.shift();

        for (var lineIndex = 0; lineIndex < lines.length; lineIndex++) {
            var line = lines[lineIndex].trim();

            if (!(/\%/.test(line))) {
                // if a line does not have a "%" in it, skip the line, it's very likely it does not have useful information in it
                continue;
            }

            var lineValues = line.split(/\s+/);

            const diskInfo = {};
            diskInfo['mountPoint'] = lineValues.pop();

            // 42% -> 42
            diskInfo['Use%'] = parseInt(lineValues.pop().replace('%', ''));

            var parsedResult = lepvUtil.parseSizeAndUnit(lineValues.pop());
            diskInfo['Available'] = parsedResult.value;
            diskInfo['Available.unit'] = parsedResult.unit;

            parsedResult = lepvUtil.parseSizeAndUnit(lineValues.pop());
            diskInfo['Used'] = parsedResult.value;
            diskInfo['Used.unit'] = parsedResult.unit;


            parsedResult = lepvUtil.parseSizeAndUnit(lineValues.pop());
            diskInfo['Size'] = parsedResult.value;
            diskInfo['Size.unit'] = parsedResult.unit;

            if (lineValues.length > 0) {
                diskInfo['Filesystem'] = lineValues.join(' ');
            }

            parsedData['parsed']['disks'][diskInfo['mountPoint']] = diskInfo;

        }
    } catch( exception ) {
        parsedData['error'] = exception.message;
    }

    return parsedData;
};

module.exports = new GetCmdDfCommander();