/*
 * Open source under the GPLv2 License or later.
 * Copyright (c) 2016, Mac Xu <shinyxxn@hotmail.com>.
 */

var SummaryLoader = function(gaugesDivName, capacityDivName) {

    this.gaugesDiv = $('#' + gaugesDivName);
    this.capacityDiv = $('#' + capacityDivName);

    this.initialized = false;

    // map from processor id to its gauge chart.
    this.gaugeMap = {};
};

SummaryLoader.prototype.initialize = function(data, callback) {

    // TODO
};


SummaryLoader.prototype.refresh = function(data, callback) {

    // TODO
};

SummaryLoader.prototype.reloadChart = function(chart, data, callback) {

    // TODO
};


SummaryLoader.prototype.createGaugeDivForProcessor = function(processorId, callback) {

    // TODO

};


SummaryLoader.prototype.createGauge = function(gaugeDivId, callback) {

     // TODO

};