/*
 * Open source under the GPLv2 License or later.
 * Copyright (c) 2016, Mac Xu <shinyxxn@hotmail.com>.
 */

var LepvCpuCharts = function(chartDivNames, socket) {


    this.socketIO = socket;

    this.chartHeaderColor = 'orange';
    
    this.maxDataCount = 150;
    this.refreshInterval = 2;

    this.proactive = true;
    this.maxRequestIdGap = 2;

    this.dataUrlPrefix = "/cpu/status/";

    this.donutChart = new LepvCpuDonutChart(chartDivNames.donutChartDivName);
    
    this.idleChart = new LepvCpuLineChart(chartDivNames.idleDivName, 'CPU Stat; Idle');
    this.userGroupChart = new LepvCpuLineChart(chartDivNames.userGroupDivName, 'CPU Stat: User+Sys+Nice');
    this.irqGroupChart = new LepvCpuLineChart(chartDivNames.irqGroupDivName, 'CPU Stat: IRQ + SoftIRQ');
    
    this.gaugeChart = new LepvGaugeChart(chartDivNames.gaugeDivName);

    this.summaryLoader = new CpuSummaryLoader('div_summary_cpu_gauges', 'div_summary_cpu_details');
};

LepvCpuCharts.prototype = Object.create(LepvChart.prototype);
LepvCpuCharts.prototype.constructor = LepvCpuCharts;

LepvCpuCharts.prototype.initializeControlElements = function() {
    this.donutChart.initializeControlElements();
    this.idleChart.initializeControlElements();
    this.userGroupChart.initializeControlElements();
    this.irqGroupChart.initializeControlElements();
};

LepvCpuCharts.prototype.initialize = function() {

    if (!this.server) {
        // console.log('server not specified for average load chart');
        return;
    }
    // this.gaugeChart.initialize();
    
    this.donutChart.initialize();
    this.idleChart.initialize();
    this.userGroupChart.initialize();
    this.irqGroupChart.initialize();

    this.initialized = true;
};

LepvCpuCharts.prototype.updateChartData = function(data) {
    
    this.donutChart.updateChartData(data['all']);

    if (!this.summaryLoader.initialized) {
        this.summaryLoader.initialize(data, this.server);
    } else {
        this.summaryLoader.refresh(data);
    }


    // keep three digits, including the ones after dot.
    // var cpuOccupationRatio = (100 - data['all']['idle']).toPrecision(3);
    // this.gaugeChart.updateChartData({'ratio': cpuOccupationRatio});
    
    delete data['all'];

    var idleStatData = {};
    var userGroupStatData = {};
    var irqGroupStatData = {};
    
    $.each( data, function( coreName, coreStatData ) {
        idleStatData[coreName] = coreStatData.idle;
        userGroupStatData[coreName] = (coreStatData.user || coreStatData.usr)
            + (coreStatData.system || coreStatData.sys)
            + coreStatData.nice;
        irqGroupStatData[coreName] = coreStatData.irq + coreStatData.soft;
    });
    
    this.idleChart.updateChartData(idleStatData);
    
    this.userGroupChart.updateChartData(userGroupStatData);
    this.irqGroupChart.updateChartData(irqGroupStatData);
};
