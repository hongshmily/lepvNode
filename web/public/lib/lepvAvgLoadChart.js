/*
 * Open source under the GPLv2 License or later.
 * Copyright (c) 2016, Mac Xu <shinyxxn@hotmail.com>.
 */

var LepvAvgLoadChart = function(divName, socket) {

    // Call the base constructor, making sure (using call)
    // that "this" is set correctly during the call
    LepvChart.call(this, divName, socket);

    this.chartTitle = "Average Load Chart";
    this.chartHeaderColor = 'orange';

    this.messageRequest = 'cpu.avgload.req';
    this.messageResponse = 'cpu.avgload.res';
    this.setupSocketIO();
    
    this.maxDataCount = 150;
    this.refreshInterval = 2;

    // this.dataUrlPrefix = "cpu/avgload/";

    this.chartData['last1'] = ['Last minute'];
    this.chartData['last5'] = ['Last 5 minutes'];
    this.chartData['last15'] = ['Last 15 minutes'];

    this.cpuCoreCount = 1;
    this.yellowAlertValue = 0.7;
    this.redAlertValue = 0.9;
    
    this.defaultMaxValue = 1;
    this.maxValues = [1];

    this.updateChartHeader();
    this.initialize();
};

LepvAvgLoadChart.prototype = Object.create(LepvChart.prototype);
LepvAvgLoadChart.prototype.constructor = LepvAvgLoadChart;

LepvAvgLoadChart.prototype.initialize = function(callback) {

    const thisChart = this;

    if (!this.server) {
        // console.log('server not specified for average load chart');
        return;
    }

    $.get('cpu/count/' + thisChart.server, function(responseData, status) {
        thisChart.cpuCoreCount = responseData.data.count;

        thisChart.yellowAlertValue = 0.7 * thisChart.cpuCoreCount;
        thisChart.redAlertValue = 0.9 * thisChart.cpuCoreCount;

        thisChart.maxValues = [thisChart.cpuCoreCount];

        thisChart.chart = c3.generate({
            bindto: '#' + thisChart.chartDivName,
            data: {
                x: 'x',
                columns: [thisChart.timeData,
                    thisChart.chartData['last1'],
                    thisChart.chartData['last5'],
                    thisChart.chartData['last15']]

            },
            legend: {
                show: true,
                position: 'bottom',
                inset: {
                    anchor: 'top-right',
                    x: 20,
                    y: 10,
                    step: 2
                }
            },
            axis: {
                x: {
                    type: 'timeseries',
                    tick: {
                        format: '%H:%M:%S'
                    }
                },
                y: {
                    label: {
                        position: "inner-middle"
                    },
                    min: 0,
                    max: thisChart.cpuCoreCount,
                    padding: {top:0, bottom:0}
                }
            },
            tooltip: {
                format: {
                    value: function (value, ratio, id) {
                        return value;
                    }
                }
            }
        });

        thisChart.initialized = true;
        if (callback) {
            callback();
        }
    });
};

LepvAvgLoadChart.prototype.updateChartData = function(data) {

    if (!(this.initialized)) {
        return;
    }

    if (this.chartData['last1'].length > this.maxDataCount) {
        this.timeData.splice(1, 1);
        this.chartData['last1'].splice(1, 1);
        this.chartData['last1'].splice(1, 1);
        this.chartData['last1'].splice(1, 1);
        this.maxValues.splice(1,1);
    }

    this.timeData.push(new Date());
    this.chartData['last1'].push(data['last1']);
    this.chartData['last5'].push(data['last5']);
    this.chartData['last15'].push(data['last15']);

    // max values are the max values of each group of data, it determines the max of y axis.
    this.maxValues.push(Math.max.apply(Math,[data['last1'], data['last5'], data['last15'], this.cpuCoreCount]));

    if (this.chart) {
        this.chart.axis.max(Math.max.apply(Math, this.maxValues) + 0.1);
        this.chart.load({
            columns: [this.timeData,
                this.chartData['last1'],
                this.chartData['last5'],
                this.chartData['last15']],
            keys: {
                value: ['']
            }
        });
    } else {
        console.log('Avarage Load chart not initialized');
    }

};
