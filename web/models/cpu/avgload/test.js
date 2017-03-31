/**
 * Created by mxu on 3/30/17.
 */

var db = require('../../../db');
db.connect();

const CpuAvgLoad = require('./index');

let avgLoad = new CpuAvgLoad();

avgLoad.last1 = 1;
avgLoad.last5 = 5;
avgLoad.last15 = 2;

avgLoad.save(function(err) {
    if (err) throw err;

    console.log('cpu avgLoad saved successfully!');
});