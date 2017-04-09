/*
 * Open source under the GPLv2 License or later.
 * Copyright (c) 2016, Mac Xu <shinyxxn@hotmail.com>.
 */

var LepvIOStatChart = function(divName, gaugeDivName, socket) {

    // Call the base constructor, making sure (using call)
    // that "this" is set correctly during the call
    LepvChart.call(this, divName, socket);

    this.chartTitle = "IO Stat Chart";
    this.chartHeaderColor = 'yellow';
    
    this.maxDataCount = 150;
    this.refreshInterval = 2;

    // this.dataUrlPrefix = "/io/status/";

    this.messageRequest = 'io.status.req';
    this.messageResponse = 'io.status.res';

    this.updateChartHeader();
    this.initialize();
};

LepvIOStatChart.prototype = Object.create(LepvChart.prototype);
LepvIOStatChart.prototype.constructor = LepvIOStatChart;

LepvIOStatChart.prototype.initialize = function(callback) {
    
    this.chart = c3.generate({
        bindto: '#' + this.chartDivName,
        data: {
            x: 'x',
            columns: [['x'], ['read'], ['write']]
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
                    text: "KB/S",
                    position: "inner-middle"
                }
            }
        },
        tooltip: {
            format: {
                value: function (value, ratio, id) {
                    return value + " kb/s";
                }
            }
        }
    });

    this.initialized = true;

    if (callback) {
        callback();
    }
};

LepvIOStatChart.prototype.updateChartData = function(data) {

    var diskDatas = data['disks'];
    
    var thisChart = this;
    $.each( diskDatas, function( diskName, diskData ) {
        if ( !(diskName in thisChart.chartData)) {
            thisChart.chartData[diskName] = {};

            thisChart.chartData[diskName]['read'] = [diskName + ' read'];
            thisChart.chartData[diskName]['write'] = [diskName + ' write'];
        }

        if (thisChart.chartData[diskName]['read'].length > thisChart.maxDataCount ) {
            thisChart.timeData.splice(1, 1);

            thisChart.chartData[diskName]['read'].splice(1, 1);
            thisChart.chartData[diskName]['write'].splice(1, 1);
        }

        thisChart.chartData[diskName]['read'].push(diskData['rkbs']);
        thisChart.chartData[diskName]['write'].push(diskData['wkbs']);

    });

    thisChart.timeData.push(new Date());
    var columnDataToDisplay = [thisChart.timeData];
    $.each( thisChart.chartData, function( diskName, diskData ) {
        columnDataToDisplay.push(diskData['read']);
        columnDataToDisplay.push(diskData['write']);
    });

    this.chart.load({
        columns: columnDataToDisplay,
        keys: {
            value: ['']
        }
    });
};
