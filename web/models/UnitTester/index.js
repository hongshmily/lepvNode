
var UnitTester = function() {
    //
    // this.END_STRING = 'lepdendstring';
    // this.port = 12307;
};

UnitTester.prototype.callCommand = function(server, command) {

    var thisClass = this;

    // get the pre-defined unit test files, fetch the predefined result of the command.

    return new Promise(function(resolve, reject){

        if (!resultInJson.includes(thisClass.END_STRING)) {
            reject({error: 'The result contains NO LEPD end string'})

        } else {
            resultInJson = resultInJson.replace(thisClass.END_STRING, '');
            var resultLines = resultInJson.split(/\n/);
            resolve(resultLines);
        }
    });




};

module.exports = new UnitTester();
