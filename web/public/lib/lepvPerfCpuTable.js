/*
 * Open source under the GPLv2 License or later.
 * Copyright (c) 2016, Mac Xu <shinyxxn@hotmail.com>.
 */

var LepvPerfCpuTable = function(divName, tableDivName, socket) {

    // Call the base constructor, making sure (using call)
    // that "this" is set correctly during the call
    LepvChart.call(this, divName, socket);

    this.setTableDivName(tableDivName);
    
    this.chartTitle = "Perf Table";
    this.chartHeaderColor = 'blue';
    
    this.maxDataCount = 25;
    this.refreshInterval = 5;

    // this.dataUrlPrefix = "/perf/cpuclock/";

    this.messageRequest = 'perf.cpuclock.req';
    this.messageResponse = 'perf.cpuclock.res';

    this.updateChartHeader();
    this.initialize();
};

LepvPerfCpuTable.prototype = Object.create(LepvChart.prototype);
LepvPerfCpuTable.prototype.constructor = LepvPerfCpuTable;

LepvPerfCpuTable.prototype.initialize = function(callback) {

    this.setupSocketIO();

    if (!this.tableDivName) {
        console.log("The table div name was not specified for " + this.chartDivName);
        return;
    }
    
    this.table = $(this.tableDivName).DataTable( {
        destroy: true,
        paging: false,
        info: false,
        searching: true,
        columns: [
            {
                title: "Command",
                orderable: false
            },
            {
                title: "Overhead",
                orderable: false
            },
            {
                title: "Shared Object",
                orderable: false
            },
            {
                title: "Symbol",
                orderable: false
            }
        ],
        order: [[ 1, "desc" ]]
    });

    this.initialized = true;
    if (callback) {
        callback();
    }
};

LepvPerfCpuTable.prototype.updateChartData = function(data) {

    var thisChart = this;
    
    this.table.rows().remove().draw( true );
    if (data != null) {
        $.each( data, function( itemIndex, dataItem ) {

            if (itemIndex >= thisChart.maxDataCount) {
                return;
            }

            thisChart.table.row.add([
                dataItem['Command'],
                dataItem['Overhead'],
                dataItem['Shared Object'],
                dataItem['Symbol']
            ]);
            index = index + 1;
        });
    } else {
        var index = 0;
        while(index < thisChart.maxDataCount) {
            thisChart.table.row.add([
                "--",
                "--",
                "--",
                "--"
            ]);
            index = index + 1;
        }
    }
    this.table.draw(true);
};
