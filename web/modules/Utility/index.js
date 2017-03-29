
var Utility = function() {
};

Utility.prototype.printJson = function(json) {

    console.log(JSON.stringify(json, null, 4));
};

Utility.prototype.generateDateString = function() {

    const today = new Date();

    const year = today.getFullYear();
    const date = today.getDate();
    const month = today.getMonth() + 1;
    const hour = today.getHours();
    const minute = today.getMinutes();
    const second = today.getSeconds();

    return year + "-" + month + "-" + date + "-" + hour + ":" + minute + ":" + second;
};

// 114.1M -> 114.1, M
// 1.2G   -> 1.2,   G
// 4.0K   -> 4.0,   K
// 0      -> 0
Utility.prototype.parseSizeAndUnit = function(valueUnitStr) {

    const parseResult = {
        value: valueUnitStr,
        unit: ''
    };

    const reg = valueUnitStr.trim().match(/(\d+\.?\d?)(G|M|K?)/);
    if (reg) {
        // if the unit if found
        parseResult.value = parseFloat(reg[1]);
        parseResult.unit = reg[2];
    }

    return parseResult;
};


module.exports = new Utility();
