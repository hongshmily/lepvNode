
// const path = require('path');
const LepvCommandProto = require('../../LepvCommandProto');

var GetCmdIotopCommander = function() {
    LepvCommandProto.call(this, 'GetCmdIotop');
};

GetCmdIotopCommander.prototype = Object.create(LepvCommandProto.prototype);
GetCmdIotopCommander.prototype.constructor = GetCmdIotopCommander;

// the output of this command is like below:
// "Total DISK READ:    -nan B/s | Total DISK WRITE:    -nan B/s",
//     "  TID PRIO     USER   DISK READ  DISK WRITE SWAPIN     IO COMMAND",
//     "    1 be/4 root          0.00 B/s    0.00 B/s 0.00 % 0.00 % /sbin/init",
//     "    2 be/4 root          0.00 B/s    0.00 B/s 0.00 % 0.00 % [kthread]",
//     "    3 be/4 root          0.00 B/s    0.00 B/s 0.00 % 0.00 % [ksoftirqd/]",
//     "    4 be/4 root          0.00 B/s    0.00 B/s 0.00 % 0.00 % [kworker/0:]",
//     "    5 be/0 root          0.00 B/s    0.00 B/s 0.00 % 0.00 % [kworker/0:0]",
//     "    7 be/4 root          0.00 B/s    0.00 B/s 0.00 % 0.00 % [rcu_sche]",
//     "    8 be/4 root          0.00 B/s    0.00 B/s 0.00 % 0.00 % [rcuos/]",
//     "    9 be/4 root          0.00 B/s    0.00 B/s 0.00 % 0.00 % [rcuos/]",
//     "   10 be/4 root          0.00 B/s    0.00 B/s 0.00 % 0.00 % [rcu_b]",
//     "   11 be/4 root          0.00 B/s    0.00 B/s 0.00 % 0.00 % [rcuob/]",
//     "   12 be/4 root          0.00 B/s    0.00 B/s 0.00 % 0.00 % [rcuob/]",
//     "   13 rt/4 root          0.00 B/s    0.00 B/s 0.00 % 0.00 % [migration/]",
//     "   14 rt/4 root          0.00 B/s    0.00 B/s 0.00 % 0.00 % [watchdog/]",
//     "   15 rt/4 root          0.00 B/s    0.00 B/s 0.00 % 0.00 % [watchdog/]",
//     "   16 rt/4 root          0.00 B/s    0.00 B/s 0.00 % 0.00 % [migration/]",
//     "   17 be/4 root          0.00 B/s    0.00 B/s 0.00 % 0.00 % [ksoftirqd/]",
//     "   19 be/0 root          0.00 B/s    0.00 B/s 0.00 % 0.00 % [kworker/1:0]",
//     "   20 be/0 root          0.00 B/s    0.00 B/s 0.00 % 0.00 % [khelpe]",
//     "   21 be/4 root  ,        0.00 B/s    0.00 B/s 0.00 % 0.00 % [kdevtmpf]",
//     "   22 be/0 root          0.00 B/s    0.00 B/s 0.00 % 0.00 % [netn]",
//     "   23 be/0 root          0.00 B/s    0.00 B/s 0.00 % 0.00 % [writebac]",
//     "   24 be/0 root          0.00 B/s    0.00 B/s 0.00 % 0.00 % [kintegrity]",
//     "   25 be/0 root          0.00 B/s    0.00 B/s 0.00 % 0.00 % [biose]",
//     "   27 be/0 root          0.00 B/s    0.00 B/s 0.00 % 0.00 % [kblock]",
//     "   28 be/0 root          0.00 B/s    0.00 B/s 0.00 % 0.00 % [ata_sf]",
//     "   29 be/4 root          0.00 B/s    0.00 B/s 0.00 % 0.00 % [khub]",
//     "   30 be/0 root          0.00 B/s    0.00 B/s 0.00 % 0.00 % [m]",
//     "   31 be/0 root          0.00 B/s    0.00 B/s 0.00 % 0.00 % [devfreq_w]",
//     "   32 be/4 root          0.00 B/s    0.00 B/s 0.00 % 0.00 % [kworker/0:]",
//     "   33 be/4 root          0.00 B/s    0.00 B/s 0.00 % 0.00 % [kworker/1:]",
//     "   34 be/4 root          0.00 B/s    0.00 B/s 0.00 % 0.00 % [khungtask]",
//     "   35 be/4 root          0.00 B/s    0.00 B/s 0.00 % 0.00 % [kswapd]",
//     "   36 be/5 root          0.00 B/s    0.00 B/s 0.00 % 0.00 % [ksm]",
//     "   37 be/4 root          0.00 B/s    0.00 B/s 0.00 % 0.00 % [fsnotify_mar]",
//     "   38 be/4 root          0.00 B/s    0.00 B/s 0.00 % 0.00 % [ecryptfs-kthre]",
//     "   39 be/0 root          0.00 B/s    0.00 B/s 0.00 % 0.00 % [crypt]",
//     "   51 be/0 root          0.00 B/s    0.00 B/s 0.00 % 0.00 % [kthrotl]",
//     "   54 be/4 root          0.00 B/s    0.00 B/s 0.00 % 0.00 % [scsi_eh_]",
//     "   55 be/4 root          0.00 B/s    0.00 B/s 0.00 % 0.00 % [scsi_eh_]",
//     "   76 be/0 root          0.00 B/s    0.00 B/s 0.00 % 0.00 % [deferw]",
//     "   77 be/0 root          0.00 B/s    0.00 B/s 0.00 % 0.00 % [charger_manage]",
//     "  121 be/0 root          0.00 B/s    0.00 B/s 0.00 % 0.00 % [kpsmouse]",
//     "  123 be/4 root          0.00 B/s    0.00 B/s 0.00 % 0.00 % [kworker/1:]",
//     "  166 be/3 root          0.00 B/s    0.00 B/s 0.00 % 0.00 % [jbd2/sda1-]",
//     "  167 be/0 root          0.00 B/s    0.00 B/s 0.00 % 0.00 % [ext4-rsv-conve]",
//     "  402 be/4 root          0.00 B/s    0.00 B/s 0.00 % 0.00 % upstart-udev-bridge --daemon",
//     "  406 be/4 root          0.00 B/s    0.00 B/s 0.00 % 0.00 % /lib/systemd/systemd-udevd --daemon",
//     "  452 be/0 root          0.00 B/s    0.00 B/s 0.00 % 0.00 % [kvm-irqfd-clea]",
//     "  523 be/4 root          0.00 B/s    0.00 B/s 0.00 % 0.00 % upstart-socket-bridge --daemon",
//     ""
GetCmdIotopCommander.prototype.parse = function(lines) {

    var parsedData = {};
    parsedData['parsed'] = {};

    try {

        // Done by Ting
        var line = lines.shift();
        while( lines.length > 0 && !line.match(/s*TID\s+PRIO\s+USER\s+DISK READ\s+DISK WRITE\s+SWAPIN\s+IO\s+COMMAND\s*/)) {
            line = lines.shift();
        }

        for (var lineIndex = 0; lineIndex < lines.length; lineIndex++) {
            line = lines[lineIndex].trim();
            if (line == '') {
                continue
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
            ioTopItem['TID'] = pid;
            ioTopItem['PRIO'] = prio;
            ioTopItem['USER'] = user;
            ioTopItem['READ'] = diskRead;
            ioTopItem['WRITE'] = diskWrite;
            ioTopItem['SWAPIN'] = swapin;
            ioTopItem['IO'] = io;
            ioTopItem['COMMAND'] = command;

            // use an incremental int as key, so we keey the order of the items.
            parsedData['parsed'][lineIndex] = ioTopItem;
        }

        } catch( exception ) {
        parsedData['error'] = exception.message;
    }

    return parsedData;
};

module.exports = new GetCmdIotopCommander();