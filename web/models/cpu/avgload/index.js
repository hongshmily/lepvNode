/**
 * Created by mxu on 3/30/17.
 */

// grab the things we need
const mongoose = require('mongoose');

// create a schema
const Schema = mongoose.Schema;

const CpuAvgLoadModelSchema = new Schema({

    last1: { type: Number, required: true},
    last5: { type: Number, required: true},
    last15: { type: Number, required: true},

    reqId: Number,
    created: Date,
    story: String

});

// Compile model from schema
let CpuAvgLoadModel = mongoose.model('cpu.avgload', CpuAvgLoadModelSchema);

module.exports = CpuAvgLoadModel;