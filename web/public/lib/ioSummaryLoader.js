/*
 * Open source under the GPLv2 License or later.
 * Copyright (c) 2016, Mac Xu <shinyxxn@hotmail.com>.
 */

var IOSummaryLoader = function(gaugesDivName, capacityDivName) {

    // Call the base constructor, making sure (using call)
    // that "this" is set correctly during the call
    SummaryLoader.call(this, gaugesDivName, capacityDivName);

    this.gaugesDivName = gaugesDivName;
    this.server = null;

    this.intervalId = null;
    this.refreshInterval = 10;  // refresh every 10 seconds.


};

IOSummaryLoader.prototype = Object.create(SummaryLoader.prototype);
IOSummaryLoader.prototype.constructor = IOSummaryLoader;


IOSummaryLoader.prototype.initialize = function(server) {

    // call get capacity data
    this.server = server;

    this.loadCapacity();

    const thisLoader = this;
    this.intervalId = setInterval(function () {
        thisLoader.loadCapacity();
    }, this.refreshInterval * 1000);
};

IOSummaryLoader.prototype.loadCapacity = function() {

    const thisLoader = this;

    thisLoader.getCapacity(function(capacityData) {

        var disks = capacityData.disks;
        for (var diskMountPoint in disks) {
            // skip loop if the property is from prototype
            if (!disks.hasOwnProperty(diskMountPoint)) {
                continue;
            }

            // skip /sys/fs/cgroup for now
            if (diskMountPoint === '/sys/fs/cgroup') {
                continue;
            }

            var diskInfo = disks[diskMountPoint];
            var diskMountPoint = diskInfo.mountPoint;

            if (diskMountPoint in thisLoader.gaugeMap) {

                // the chart for this disk/mountpoint is already there, just load/refresh data for it
                thisLoader.loadChartData(thisLoader.gaugeMap[diskMountPoint], diskInfo);

            } else {

                thisLoader.createGaugeDiv(diskInfo,  function(gaugeChart) {
                    thisLoader.loadChartData(thisLoader.gaugeMap[diskMountPoint], diskInfo);
                })
            }
        }
    })

};

IOSummaryLoader.prototype.getCapacity = function(callback) {

    // call get capacity data

    var url = '/io/capacity/' + this.server;
    $.get(url).done(
        function(response, status) {
            callback(response.data);
        }
    ).fail(
        function(data, status) {
            console.log("Accessing URL failed: " + url);
            console.log(data);
            console.log(status);
        }
    );
};


IOSummaryLoader.prototype.createGaugeDiv = function(diskInfo, callback) {

    var thisLoader = this;

    var colDiv = $('<div></div>').addClass('col-lg-2').addClass('gauge-div');
    this.gaugesDiv.append(colDiv);

    var panelDiv = $('<div></div>').addClass('panel panel-primary');
    colDiv.append(panelDiv);

    var randomString = Math.random().toString().substr(2, 8);
    var gaugeId = 'gauge' + randomString;
    var gaugeDiv = $('<div></div>').attr('id',gaugeId);
    panelDiv.append(gaugeDiv);

    var footerDiv = $('<div></div>').addClass('panel-footer text-center').text(diskInfo.mountPoint);
    panelDiv.append(footerDiv);

    // create gauge.
    this.createGauge(gaugeId, function(chart) {
        thisLoader.gaugeMap[diskInfo.mountPoint] = chart;

        callback(chart);
    })

};

IOSummaryLoader.prototype.loadChartData = function(gaugeChart, data) {

    if (!gaugeChart) {
        return;
    }

    if (!data) {
        return;
    }

    data['ratio'] = 100 - data.idle;

    gaugeChart.load({
        json: [
            data
        ],
        keys: {
            value: ['Use%']
        }
    });
};

IOSummaryLoader.prototype.createGauge = function(gaugeDivId, callback) {

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