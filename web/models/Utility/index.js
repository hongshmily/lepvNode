
var Utility = function() {
};

Utility.prototype.printJson = function(json) {

    console.log(JSON.stringify(json, null, 4));
};


module.exports = new Utility();
