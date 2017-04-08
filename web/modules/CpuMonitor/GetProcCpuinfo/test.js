/**
 * Created by mxu on 12/30/16.
 */

const commander = require('./index');
const util = require('../../Utility');

const server = 'www.linuxxueyuan.com';
let options = {server: server, debug: true};

options = {
    debug: true,
    mockData: 'Processor\t: ARMv7 Processor rev 4 (v7l)\nprocessor\t: 0\nBogoMIPS\t: 1810.43\n\nprocessor\t: 1\nBogoMIPS\t: 1823.53\n\nFeatures\t: swp half thumb fastmult vfp edsp neon vfpv3 tls vfpv4 idiva idivt \nCPU implementer\t: 0x41\nCPU architecture: 7\nCPU variant\t: 0x0\nCPU part\t: 0xc07\nCPU revision\t: 4\n\nHardware\t: sun7i\nRevision\t: 0000\nSerial\t\t: 0000000000000000\nlepdendstring'
};

const promise = commander.run(options);
promise.then(function(response) {
    util.printJson(response);
});