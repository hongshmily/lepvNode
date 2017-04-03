/*
 * Open source under the GPLv2 License or later.
 * Copyright (c) 2016, Mac Xu <shinyxxn@hotmail.com>.
 */

var LepvProcrankTable = function(divName, tableDivName, pssPieDivName, freeVsPssDivName, socket) {

    this.socketIO = socket;

    // Call the base constructor, making sure (using call)
    // that "this" is set correctly during the call
    LepvChart.call(this, divName);
    this.setTableDivName(tableDivName);
    
    this.chartTitle = "Memory Stat Table";
    this.chartHeaderColor = 'green';
    
    this.maxDataCount = 25;
    this.refreshInterval = 5;

    this.dataUrlPrefix = "/memory/procrank/";
    
    this.updateChartHeader();
    this.initialize();

    this.pssData = [];
    this.pssBenchmark = 200;
    this.pssPieChart = new LepvProcrankPssPieChart(pssPieDivName);
    this.FreeVsPssChart = new LepvProcrankFreeVsPieChart(freeVsPssDivName);
};

LepvProcrankTable.prototype = Object.create(LepvChart.prototype);
LepvProcrankTable.prototype.constructor = LepvProcrankTable;

LepvProcrankTable.prototype.initialize = function(callback) {

    this.table = $(this.tableDivName).DataTable( {
        destroy: true,
        paging: false,
        info: false,
        searching: true,
        columns: [
            { title: "PID", orderable: false },
            { title: "VSS", orderable: false },
            { title: "RSS", orderable: false },
            { title: "PSS", orderable: true },
            { title: "USS", orderable: false },
            { title: "CMDLINE", orderable: false }
        ],
        order: [[ 4, "desc" ]]
    });

    this.initialized = true;
    if (callback) {
        callback();
    }
};

LepvProcrankTable.prototype.updateChartData = function(data) {

    this.updateStatTableData(data.procranks);
    
    this.pssPieChart.updateChartData(this.pssData);
    this.FreeVsPssChart.updateChartData(data.sum);
};

LepvProcrankTable.prototype.updateStatTableData = function(procranks) {

    var thisChart = this;

    var index = 0;
    this.pssData = [];
    this.table.rows().remove().draw( true );
    if (procranks != null) {
        $.each( procranks, function( lineIndex, dataItem ) {

            if (lineIndex >= thisChart.maxDataCount) {
                return;
            }

            thisChart.table.row.add([
                dataItem.pid || dataItem.PID,
                dataItem.vss || dataItem.Vss,
                dataItem.rss || dataItem.Rss,
                dataItem.pss || dataItem.Pss,
                dataItem.uss || dataItem.Uss,
                dataItem.cmdline
            ]);
            
            if ((dataItem.pss || dataItem.Pss) > thisChart.pssBenchmark) {
                thisChart.pssData.push([dataItem.cmdline, dataItem.pss || dataItem.Pss]);
            }
            
            index = index + 1;
        });
    } else {
        while(index < thisChart.maxDataCount) {
            thisChart.table.row.add([
                "--",
                "--",
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
