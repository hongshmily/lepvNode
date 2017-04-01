/*
 * Open source under the GPLv2 License or later.
 * Copyright (c) 2016, Mac Xu <shinyxxn@hotmail.com>.
 */

var CpuSummaryLoader = function(gaugesDivName, capacityDivName) {

    // Call the base constructor, making sure (using call)
    // that "this" is set correctly during the call
    SummaryLoader.call(this, gaugesDivName, capacityDivName);
};

CpuSummaryLoader.prototype = Object.create(SummaryLoader.prototype);
CpuSummaryLoader.prototype.constructor = CpuSummaryLoader;


CpuSummaryLoader.prototype.initialize = function(data, callback) {

    for (var processorName in data) {
        // skip loop if the property is from prototype
        if (!data.hasOwnProperty(processorName)) {
            continue;
        }

        if (processorName == 'all') {
            continue;
        }

        this.createGaugeDivForProcessor(processorName);
    }

    this.initialized = true;
};


CpuSummaryLoader.prototype.refresh = function(data, callback) {

    for (var processorName in data) {
        // skip loop if the property is from prototype
        if (!data.hasOwnProperty(processorName)) {
            continue;
        }

        if (processorName == 'all') {
            continue;
        }

        var chart = this.gaugeMap[processorName];
        this.reloadChart(chart, data[processorName]);
    }

    this.initialized = true;
};

CpuSummaryLoader.prototype.reloadChart = function(chart, data, callback) {

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

CpuSummaryLoader.prototype.createGaugeDivForProcessor = function(processorId, callback) {

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


CpuSummaryLoader.prototype.createGauge = function(gaugeDivId, callback) {

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