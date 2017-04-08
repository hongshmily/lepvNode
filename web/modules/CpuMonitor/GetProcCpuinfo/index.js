
// const path = require('path');
const LepvCommandProto = require('../../LepvCommandProto');

var GetProCpuinfoCommander = function() {
    LepvCommandProto.call(this, 'GetProcCpuinfo');

    this.parsedData = {
        parsed: {
            processors: {
            },
            count: 0
        }
    };
};

GetProCpuinfoCommander.prototype = Object.create(LepvCommandProto.prototype);
GetProCpuinfoCommander.prototype.constructor = GetProCpuinfoCommander;


GetProCpuinfoCommander.prototype.parseForArm = function(lines) {

    let processorId = null;

    lines.shift();

    while(lines.length > 0) {
        let line = lines.shift().trim();

        if (line == '') {
            continue;
        }

        if (/Features\s?:/.test(line)) {

            var pairs = line.split(':');
            var featuresString = pairs[1].trim();
            var features = featuresString.split(/\s+/);

            this.parsedData.parsed.features = features;

            break;
        }

        if (line.match(/processor\s?:\s?\d/)) {
            var reg = line.match(/processor\s?:\s?(\d+)/);
            processorId = reg[1].trim();

            this.parsedData.parsed['processors'][processorId] = {};
            this.parsedData.parsed.count++;
            continue;
        }

        let keyValuePair = line.split(':');
        if (keyValuePair.length == 2) {
            this.parsedData.parsed['processors'][processorId][keyValuePair[0].trim()] = keyValuePair[1].trim();
        }
    }

    while(lines.length > 0) {
        let line = lines.shift().trim();

        if (line == '') {
            continue;
        }

        var reg = line.match(/CPU architecture:\s+(.*)/);
        if (reg) {
            this.parsedData.parsed.architecture = 'ARM v' + reg[1];
            continue;
        }
    }
};

GetProCpuinfoCommander.prototype.parseForX86 = function(lines) {

    let processorId = null;

    while(lines.length > 0) {
        let line = lines.shift().trim();

        if (line == '') {
            continue;
        }

        if (line.match(/processor\s?:\s?\d/)) {
            var reg = line.match(/processor\s?:\s?(\d+)/);
            processorId = reg[1].trim();

            this.parsedData.parsed['processors'][processorId] = {};
            this.parsedData.parsed.count++;
            continue;
        }

        let keyValuePair = line.split(':');
        if (keyValuePair.length == 2) {
            this.parsedData.parsed['processors'][processorId][keyValuePair[0].trim()] = keyValuePair[1].trim();
        }
    }
};


GetProCpuinfoCommander.prototype.parse = function(lines) {

    const thisCommander = this;

    try {

        const firstLine = lines[0];

        if (/Processor\s?:\s?ARM/.test(firstLine)) {

            this.parseForArm(lines);
        } else {
            this.parseForX86(lines);
        }

    } catch( exception ) {
        thisCommander.parsedData['error'] = exception.message;
    }

    return thisCommander.parsedData;
};

module.exports = new GetProCpuinfoCommander();