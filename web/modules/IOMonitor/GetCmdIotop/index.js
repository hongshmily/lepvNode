
// const path = require('path');
const LepvCommandProto = require('../../LepvCommandProto');

var GetCmdIotopCommander = function() {
    LepvCommandProto.call(this, 'GetCmdIotop');
};

GetCmdIotopCommander.prototype = Object.create(LepvCommandProto.prototype);
GetCmdIotopCommander.prototype.constructor = GetCmdIotopCommander;

// the output of this command is like below:
// NOTE: as shown in TID 21, there is a ",", this is not commonly seen, but it happens, thus deserves special handling.
// "Total DISK READ:    -nan B/s | Total DISK WRITE:    -nan B/s",
//     "  TID PRIO     USER   DISK READ  DISK WRITE SWAPIN     IO COMMAND",
//     "    1 be/4 root          0.00 B/s    0.00 B/s 0.00 % 0.00 % /sbin/init",
//     "    2 be/4 root          0.00 B/s    0.00 B/s 0.00 % 0.00 % [kthread]",
//     "    3 be/4 root          0.00 B/s    0.00 B/s 0.00 % 0.00 % [ksoftirqd/]",
//     "    4 be/4 root          0.00 B/s    0.00 B/s 0.00 % 0.00 % [kworker/0:]",
//     "   21 be/4 root          0.00 B/s,    0.00 B/s 0.00 % 0.00 % [kdevtmpf]",
//     "   22 be/0 root          0.00 B/s    0.00 B/s 0.00 % 0.00 % [netn]",
//     "  402 be/4 root          0.00 B/s    0.00 B/s 0.00 % 0.00 % upstart-udev-bridge --daemon",
//     "  406 be/4 root          0.00 B/s    0.00 B/s 0.00 % 0.00 % /lib/systemd/systemd-udevd --daemon",
//     "  452 be/0 root          0.00 B/s    0.00 B/s 0.00 % 0.00 % [kvm-irqfd-clea]",
//     "  523 be/4 root          0.00 B/s    0.00 B/s 0.00 % 0.00 % upstart-socket-bridge --daemon",
//     ""
GetCmdIotopCommander.prototype.parse = function(lines) {

    var parsedData = {};
    parsedData['parsed'] = [];

    try {

        // Done by Ting
        var line = lines.shift();
        while( lines.length > 0 && !line.match(/s*TID\s+PRIO\s+USER\s+DISK READ\s+DISK WRITE\s+SWAPIN\s+IO\s+COMMAND\s*/)) {
            line = lines.shift();
        }

        if (lines.length === 0) {
            parsedData['error'] = 'Failed to locate the header line of "TID PRIO     USER   DISK READ  DISK WRITE SWAPIN     IO COMMAND"'
        }

        for (var lineIndex = 0; lineIndex < lines.length; lineIndex++) {
            line = lines[lineIndex].trim();
            if (line == '') {
                continue
            }

            if (/,/.test(line)) {
                //"   21 be/4 root          0.00 B/s,    0.00 B/s 0.00 % 0.00 % [kdevtmpf]",
                //"   22 be/0 root    ,      0.00 B/s    0.00 B/s 0.00 % 0.00 % [netn]",
                // There is a ",", this is not commonly seen, but it happens, thus deserves special handling.
                line = line.replace(',', '');
            }

            // find the 'M/s" or 'B/s', they are for disk read and write
            var matches = line.match(/\s*\d+\.\d{2}\s*[G|M|B]\/s\s+/g);
            if (matches) {
                var diskRead = matches[0].trim();
                var diskWrite = matches[1].trim();
            }

            // find the "0.00 %" occurrences, they are for swapin and io
            var matches = line.match(/\s*\d+\.\d{2}\s*%\s+/g);
            if (matches) {
                var swapin = matches[0].trim();
                var io = matches[1].trim();
            }
            var lineValues = line.split(/\s+/);
            var pid = lineValues[0].trim();
            var prio = lineValues[1].trim();
            var user = lineValues[2].trim();

            var lastPercentIndex = line.lastIndexOf('%');
            var command = line.substring(lastPercentIndex + 1).trim();

            var ioTopItem = {};
            ioTopItem['rowIndex'] = lineIndex + 1;
            ioTopItem['TID'] = pid;
            ioTopItem['PRIO'] = prio;
            ioTopItem['USER'] = user;
            ioTopItem['READ'] = diskRead;
            ioTopItem['WRITE'] = diskWrite;
            ioTopItem['SWAPIN'] = swapin;
            ioTopItem['IO'] = io;
            ioTopItem['COMMAND'] = command;

            // use an incremental int as key, so we keey the order of the items.
            parsedData['parsed'].push(ioTopItem);
        }

        } catch( exception ) {
        parsedData['error'] = exception.message;
    }

    return parsedData;
};

module.exports = new GetCmdIotopCommander();