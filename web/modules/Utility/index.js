
var Utility = function() {
};

Utility.prototype.printJson = function(json) {

    console.log(JSON.stringify(json, null, 4));
};

Utility.prototype.generateDateString = function() {

    var today = new Date();

    const year = today.getFullYear();
    const date = today.getDate();
    const month = today.getMonth() + 1;
    const day = today.getDay();
    const hour = today.getHours();
    const minute = today.getMinutes();
    const second = today.getSeconds();

    return year + "-" + month + "-" + date + "-" + hour + ":" + minute + ":" + second;
};


module.exports = new Utility();
