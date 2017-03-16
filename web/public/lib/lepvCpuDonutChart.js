/*
 * Open source under the GPLv2 License or later.
 * Copyright (c) 2016, Mac Xu <shinyxxn@hotmail.com>.
 */

var LepvCpuDonutChart = function(chartDivName) {
    
    LepvChart.call(this, chartDivName);
    
    this.chartTitle = "CPU Chart";
    this.chartHeaderColor = 'orange';
    
    this.maxDataCount = 150;
    this.refreshInterval = 2;

    this.proactive = false;

    this.updateChartHeader();
    this.initialize();
};

LepvCpuDonutChart.prototype = Object.create(LepvChart.prototype);
LepvCpuDonutChart.prototype.constructor = LepvCpuDonutChart;

LepvCpuDonutChart.prototype.initialize = function() {

    $('#' + this.chartDivName).empty();
    
    this.chart = c3.generate({
        bindto: '#' + this.chartDivName,
        data: {
            columns: [
                ['user', 0],
                ['nice', 0],
                ['system', 0],
                ['idle', 0],
                ['iowait', 0],
                ['irq', 0],
                ['softirq', 0],
                ['steal', 0],
                ['guest', 0],
                ['guestnice', 0]
            ],
            type : 'donut',
            colors: {
                idle: "green",
                user: 'blue',
                system: 'red',
                nice: "orange"
            }
        },
        donut: {
            title: "CPU STAT"
        },
        legend: {
            show: true,
            position: 'right'
        }
    });

    this.initialized = true;
};

LepvCpuDonutChart.prototype.updateChartData = function(overallData) {

    if (!this.chart) {
        return;
    }

    var columnsForChart = [];
    for (var columnName in overallData) {
        columnsForChart.push([columnName, overallData[columnName]]);
    }

    this.chart.load({
        columns: columnsForChart,
        keys: {
            value: ['']
        }
    });

};
