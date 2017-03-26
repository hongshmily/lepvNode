
const SocketIOEventer = function() {

    this.socketIO = null;

    this.socketedModles = [
        '../PerfMonitor'
    ];
};

SocketIOEventer.prototype.setup = function(socketIO) {

    for (var i = 0; i < this.socketedModles.length; i++) {

        var socketedModule = require(this.socketedModles[i]);
        // socketedModule.setupSocketIo(socketIO);
    }
};

module.exports = new SocketIOEventer();
