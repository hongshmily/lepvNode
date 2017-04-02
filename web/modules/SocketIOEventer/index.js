
const cpuMonitor = require('../CpuMonitor');

const SocketIOEventer = function(socket) {

    this.socketIO = socket;

    this.socketedModles = [
        '../CpuMonitor'
    ];
};

SocketIOEventer.prototype.setup = function() {

    const thisEventer = this;

    cpuMonitor.setupSocketEvents(this.socketIO);




    // for (var i = 0; i < this.socketedModles.length; i++) {
    //
    //     var socketedModule = require(this.socketedModles[i]);
    //     // socketedModule.setupSocketIo(socketIO);
    // }
};

module.exports = SocketIOEventer;
