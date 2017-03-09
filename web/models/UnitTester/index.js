
var UnitTester = function() {
};

UnitTester.prototype.testMethod = function(functor, testDatas, callback) {

    testDatas.samples.forEach(function(testData) {

        console.log(testData.result);

        functor({mockData: testData.result, debug: true}, callback);
    });
};


module.exports = new UnitTester();
