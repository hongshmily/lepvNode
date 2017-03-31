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