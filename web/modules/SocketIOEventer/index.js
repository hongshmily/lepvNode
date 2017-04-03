
const cpuMonitor = require('../CpuMonitor');

const SocketIOEventer = function(socket) {

    this.socketIO = socket;

    this.socketedModles = [
        '../CpuMonitor',
        '../IOMonitor',
        '../MemoryMonitor',
        '../PerfMonitor'
    ];
};

SocketIOEventer.prototype.setup = function() {

    const thisEventer = this;

    for (var i = 0; i < this.socketedModles.length; i++) {

        var socketedModule = require(this.socketedModles[i]);

        var socketMessages = socketedModule.socketMessages;

        if (!socketMessages) {
            console.log("socket message map not available");
            continue;
        }

        for (var message in socketMessages) {
            // skip loop if the property is from prototype
            if (!socketMessages.hasOwnProperty(message)) {
                continue;
            }

            var functor = socketMessages[message];

            thisEventer.setupSocketEventByMessage(thisEventer.socketIO, message, functor);

        }

    }
};

SocketIOEventer.prototype.setupSocketEventByMessage = function(socketIO, socketMessage, functor) {

    let message = socketMessage;
    let messageReq = message + '.req';
    let messageRes = message + ".res";

    console.log("Setting up socket.IO for " + message);
    socketIO.on(messageReq, function(params) {
        console.log("Received client message for " + messageReq);

        let promise = functor(params);
        promise.then(function(response) {
            socketIO.emit(messageRes, response.data);
        },
        function(err) {
            console.log(err);
        })
    });

};

module.exports = SocketIOEventer;
