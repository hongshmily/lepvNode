/*
 * Open source under the GPLv2 License or later.
 * Copyright (c) 2016, Mac Xu <shinyxxn@hotmail.com>.
 */

var SummaryLoader = function(gaugesDivName, detailDivName) {

    // this.gaugesDiv = $('#div_summary_cpu_gauges');
    // this.detailDiv = $('#div_summary_cpu_details');

    this.gaugesDiv = $('#' + gaugesDivName);
    this.detailDiv = $('#' + detailDivName);

    this.initialized = false;

    // map from processor id to its gauge.
    this.gaugeMap = {};
};

SummaryLoader.prototype.initialize = function(processorDatas, callback) {

    for (var processorName in processorDatas) {
        // skip loop if the property is from prototype
        if (!processorDatas.hasOwnProperty(processorName)) {
            continue;
        }

        if (processorName == 'all') {
            continue;
        }

        var processorData = processorDatas[processorName];

        this.createGaugeForProcessor(processorName);
    }

    this.initialized = true;
};


SummaryLoader.prototype.refresh = function(processorDatas, callback) {

    for (var processorName in processorDatas) {
        // skip loop if the property is from prototype
        if (!processorDatas.hasOwnProperty(processorName)) {
            continue;
        }

        if (processorName == 'all') {
            continue;
        }

        var chart = this.gaugeMap[processorName];
        this.reloadChart(chart, processorDatas[processorName]);
    }

    this.initialized = true;
};

SummaryLoader.prototype.reloadChart = function(chart, data, callback) {

    if (!chart) {
        return;
    }

    if (!data) {
        return;
    }

    data['ratio'] = 100 - data.idle;

    chart.load({
        json: [
            data
        ],
        keys: {
            value: ['ratio']
        }
    });
};


SummaryLoader.prototype.createGaugeForProcessor = function(processorId, callback) {

    var thisLoader = this;

    var colDiv = $('<div></div>').addClass('col-lg-2');
    this.gaugesDiv.append(colDiv);

    var panelDiv = $('<div></div>').addClass('panel panel-primary');
    colDiv.append(panelDiv);

    var randomString = Math.random().toString().substr(2, 8);
    var gaugeId = 'gauge' + randomString;
    var gaugeDiv = $('<div></div>').attr('id',gaugeId);
    panelDiv.append(gaugeDiv);

    var footerDiv = $('<div></div>').addClass('panel-footer text-center').text(' processor: ' + processorId);
    panelDiv.append(footerDiv);

    // create gauge.
    this.createGauge(gaugeId, function(chart) {
        thisLoader.gaugeMap[processorId] = chart;
    })

};


SummaryLoader.prototype.createGauge = function(gaugeDivId, callback) {

     var chart = c3.generate({
        bindto: '#' + gaugeDivId,
        data: {
            columns: [
            ],
            type: 'gauge'
        },
        gauge: {
            label: {
                format: function(value, ratio) {
                    return value + "%";
                },
                show: true // to turn off the min/max labels.
            },
            min: 0, // 0 is default, //can handle negative min e.g. vacuum / voltage / current flow / rate of change
            max: 100, // 100 is default
            width: 30 // for adjusting arc thickness
        },
        color: {
            pattern: ['#60B044', '#F6C600', '#F97600', '#FF0000'], // the three color levels for the percentage values.
            threshold: {
                values: [30, 60, 90, 100]
            }
        },
        size: {
            height: 100
        }
    });

     callback(chart);

};