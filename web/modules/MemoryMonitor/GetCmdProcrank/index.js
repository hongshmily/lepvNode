
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

    var parsedData = {
        parsed: {
            procranks: [],
            sum: {}
        }
    };

    try {
        // Done by Ting
        var line = lines.shift();

        if (!line.match(/\s*PID\s+Vss/)) {
            parsedData['parsed']['error'] = 'Failed to locate a header line beginning with "  PID       Vss..."';
            return parsedData;
        }

        var headerColumns = line.trim().split(/\s+/);

        var summaryDelimitorLineIndex;
        for (var lineIndex = 0; lineIndex < lines.length; lineIndex++) {
            line = lines[lineIndex].trim();
            if (line == '') {
                continue
            }
            if (line.match( /\s*-+\s*-+\s*-+\s*/)) {
                summaryDelimitorLineIndex = lineIndex;
                break;
            }

            var lineValues = line.split(/\s+/);

            var procRankData = {};
            procRankData['rowIndex'] = lineIndex;

            for (var columnIndex = 0; columnIndex < lineValues.length - 1; columnIndex++) {
                procRankData[headerColumns[columnIndex]] = parseFloat(lineValues[columnIndex]);
            }

            // last column is the "cmdline", which may contain whitespaces thus requires special handling
            procRankData[headerColumns[lineValues.length - 1]] = lineValues.slice(headerColumns.length - 1).join(' ');


            parsedData.parsed['procranks'].push(procRankData);
        }

        // now parse the summary info
        for (var lineIndex = summaryDelimitorLineIndex; lineIndex < lines.length; lineIndex++) {
            line = lines[lineIndex].trim();
            if (line == '') {
                continue
            }

            // "                          107243K  106752K  TOTAL",
            if (/\s+TOTAL/.test(line)) {

                const summaryInfos = line.trim().split(/\s+/);

                var sumValue = summaryInfos[0];
                parsedData.parsed.sum['pssTotal'] = sumValue.substr(0, sumValue.length - 1);
                parsedData.parsed.sum['pssTotalUnit'] = sumValue.slice(-1);

                sumValue = summaryInfos[1];
                parsedData.parsed.sum['ussTotal'] = sumValue.substr(0, sumValue.length-1);
                parsedData.parsed.sum['ussTotalUnit'] = sumValue.slice(-1);

                continue;
            }

            //RAM: 243644K total, 30772K free, 27140K buffers, 31752K cached, 336K shmem, 38544K slab
            if (/\s?RAM/.test(line)) {

                const sums = line.replace('RAM:', '').trim().split(',');

                for (var i = 0; i < sums.length; i++ ) {
                    const sumProperty = sums[i].trim().split(/\s+/);

                    const sumPropertyKey = sumProperty[1].trim();
                    const sumPropertyValueUnit = sumProperty[0].trim().slice(-1);
                    const sumPropertyValue = sumProperty[0].trim().substr(0, sumProperty[0].trim().length - 1);

                    parsedData.parsed.sum[sumPropertyKey] = sumPropertyValue;
                    parsedData.parsed.sum[sumPropertyKey + "Unit"] = sumPropertyValueUnit;

                }
            }
        }

    } catch( exception ) {
        parsedData['error'] = exception.message;
    }

    return parsedData;
};

module.exports = new GetCmdProcrankCommander();