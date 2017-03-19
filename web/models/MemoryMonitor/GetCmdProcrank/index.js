
const LepvCommandProto = require('../../LepvCommandProto');

var GetCmdProcrankCommander = function() {
    LepvCommandProto.call(this, 'GetCmdProcrank');
};

GetCmdProcrankCommander.prototype = Object.create(LepvCommandProto.prototype);
GetCmdProcrankCommander.prototype.constructor = GetCmdProcrankCommander;

// the output of this command is like below:
// "  PID       Vss      Rss      Pss      Uss  cmdline",
//     " 1249  1449928K   87860K   87769K   87744K  ./lepd",
//     "  815   260068K    7152K    6953K    6880K  rsyslogd",
//     "  600    10216K    2848K    2668K    2612K  dhclient",
//     " 1151    21132K    1828K    1824K    1824K  -bash",
//     "    1    33636K    2036K    1788K    1712K  /sbin/init",
//     "  406    49740K     724K     720K     720K  /lib/systemd/systemd-udevd",
//     "  984    61368K     684K     680K     680K  /usr/sbin/sshd",
//     "  806    39208K     612K     563K     552K  dbus-daemon",
//     " 1090    78180K     552K     548K     548K  /bin/login",
//     "  860    43444K     344K     340K     340K  /lib/systemd/systemd-logind",
//     "  999    19184K     488K     338K     292K  /usr/sbin/irqbalance",
//     "  979    23648K     408K     304K     276K  cron",
//     "  402    19468K     492K     290K     236K  upstart-udev-bridge",
//     "  785    15268K     492K     290K     236K  upstart-file-bridge",
//     "  523    15252K     488K     286K     232K  upstart-socket-bridge",
//     "  974    19132K     200K     185K     184K  atd",
//     "  935    14532K     168K     164K     164K  /sbin/getty",
//     "  946    14532K     168K     164K     164K  /sbin/getty",
//     " 1081    14532K     168K     164K     164K  /sbin/getty",
//     "  943    14532K     164K     160K     160K  /sbin/getty",
//     "  942    14532K     160K     156K     156K  /sbin/getty",
//     "  932    14532K     156K     152K     152K  /sbin/getty",
//     "  971     4360K     152K     148K     148K  acpid",
//     "                           ------   ------  ------",
//     "                          106659K  106176K  TOTAL",
//     "",
//     "RAM: 243644K total, 36808K free, 24952K buffers, 29244K cached, 336K shmem, 37820K slab",
//     ""
GetCmdProcrankCommander.prototype.parse = function(lines) {

    var parsedData = {};
    parsedData['parsed'] = {};
    parsedData.parsed['procranks'] = {};

    try {
        // Done by Ting
        var line = lines.shift();

        if (!line.match(/\s*PID\s+Vss/)) {
            parsedData['parsed']['error'] = 'Failed to locate a header line beginning with "  PID       Vss..."';
            return parsedData;
        }

        var headerColumns = line.trim().split(/\s+/);
        var lineIndex = 0
        while(lines.length > 0) {
            line = lines.shift();
            if (line.match( /\s*-+\s*-+\s*-+\s*/)) {
                break;
            }
            var lineValues = line.trim().split(/\s+/);

            parsedData.parsed['procranks'][lineIndex] = {};

            for (var columnIndex = 0; columnIndex < lineValues.length-1; columnIndex++) {
                parsedData.parsed['procranks'][lineIndex][headerColumns[columnIndex]] = parseFloat(lineValues[columnIndex]);
            }
            parsedData.parsed['procranks'][lineIndex][headerColumns[columnIndex]] = lineValues[columnIndex];
            lineIndex += 1
        }
    } catch( exception ) {
        parsedData['error'] = exception.message;
    }

    return parsedData;
};

module.exports = new GetCmdProcrankCommander();