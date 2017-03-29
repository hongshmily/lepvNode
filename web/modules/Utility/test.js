/**
 * Created by mxu on 12/30/16.
 */

var util = require('./index');


// util.printJson({server: 'www.rmlink.cn', options: {name: 'Mac', email: 'mxu@marinsoftware.com'}});

// var dTimes = util.generateDateString();
// console.log(dTimes);


// 114.1M -> 114.1, M
// 1.2G   -> 1.2,   G
// 4.0K   -> 4.0,   K
// 0      -> 0
const parseResult = util.parseSizeAndUnit('0');
console.log(parseResult);