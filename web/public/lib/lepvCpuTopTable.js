/*
 * Open source under the GPLv2 License or later.
 * Copyright (c) 2016, Mac Xu <shinyxxn@hotmail.com>.
 */

var LepvCpuTopTable = function(divName, tableDivName, socket) {

    // this.socketIO = socket;

    // Call the base constructor, making sure (using call)
    // that "this" is set correctly during the call
    LepvChart.call(this, divName, socket);
    
    this.setTableDivName(tableDivName);
    
    this.chartTitle = "CPU Top Table";
    this.chartHeaderColor = 'orange';
    
    this.maxDataCount = 25;
    this.refreshInterval = 5;

    // this.dataUrlPrefix = "/cpu/top/";

    this.messageRequest = 'cpu.top.req';
    this.messageResponse = 'cpu.top.res';

    this.updateChartHeader();
    this.initialize();
};

LepvCpuTopTable.prototype = Object.create(LepvChart.prototype);
LepvCpuTopTable.prototype.constructor = LepvCpuTopTable;

LepvCpuTopTable.prototype.initialize = function() {

    this.setupSocketIO();

    if (!this.tableDivName) {
        console.log("The table div name was not specified for " + this.chartDivName);
        return;
    }

    this.initialized = true;
};

LepvCpuTopTable.prototype.updateChartData = function(data) {

    var thisChart = this;
    
    if (!this.table) {
        this.initializeDataTable(data.headerline);
    }
    
    this.table.rows().remove().draw( true );

    var headerColumns = data.headerline.split(/\s+/);

    var topData = data.rows;
    if (topData) {
        $.each( topData, function( lineIndex, dataItem ) {

            if (lineIndex >= thisChart.maxDataCount) {
                return;
            }
            
            var rowData = [];
            headerColumns.forEach(function(value, index) {
                rowData.push(dataItem[value]);
            });

            thisChart.table.row.add(rowData);

        });
    } else {
        var rowData = [];
        var columnCount = headerColumns.size();
        while(columnCount--) {
            rowData.push("--")
        }

        thisChart.table.row.add(rowData);
    }
    
    this.table.draw(true);
};
