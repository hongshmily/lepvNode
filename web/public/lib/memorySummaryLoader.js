/*
 * Open source under the GPLv2 License or later.
 * Copyright (c) 2016, Mac Xu <shinyxxn@hotmail.com>.
 */

var MemorySummaryLoader = function(gaugesDivName, capacityDivName) {

    // Call the base constructor, making sure (using call)
    // that "this" is set correctly during the call
    // SummaryLoader.call(this, gaugesDivName, capacityDivName);

    this.gaugeDivName = gaugesDivName;

    this.chart = null;

    this.initialized = false;
};

MemorySummaryLoader.prototype = Object.create(SummaryLoader.prototype);
MemorySummaryLoader.prototype.constructor = MemorySummaryLoader;


MemorySummaryLoader.prototype.initialize = function(data, callback) {

    const thisLoader = this;
    this.chart = c3.generate({
        bindto: '#' + thisLoader.gaugeDivName,
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

    this.initialized = true;
};


MemorySummaryLoader.prototype.refresh = function(data, callback) {

    if (!this.chart) {
        return;
    }

    if (!data) {
        return;
    }

    this.chart.load({
        json: [
            data
        ],
        keys: {
            value: ['ratio']
        }
    });
};

MemorySummaryLoader.prototype.reloadChart = function(chart, data, callback) {

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