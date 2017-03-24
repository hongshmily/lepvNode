/*
 * Open source under the GPLv2 License or later.
 * Copyright (c) 2016, Mac Xu <shinyxxn@hotmail.com>.
 */

var CpuCapacityLoader = function(divName) {

    this.divName = '#' + divName;
    this.server = null;

};

CpuCapacityLoader.prototype.start = function(serverToMonitor) {

    const thisLoader = this;
    if (this.server == serverToMonitor) {
        return;
    }

    this.server = serverToMonitor;

    $(this.divName).empty();

    const url = "/cpu/capacity/" + this.server;
    $.get(url, function(responseData, status){

        thisLoader.showCapacityInfo(responseData['data']);
    });
};

CpuCapacityLoader.prototype.showCapacityInfo = function(capacityData) {

    $(this.divName).empty();

    const ulElement = $("<ul></ul>").addClass('list-group');
    const liElement1 =  $("<li></li>").addClass('list-group-item').text('CPU: ' + capacityData['summary'] + " ");

    const imgElement = $("<img></img>").addClass("logo-icon");
    if (capacityData['architecture'] == "ARM") {
        imgElement.attr("src", "/images/arm.jpg");
    } else {
        imgElement.attr("src", "/images/x86.png");
    }
    liElement1.append(imgElement);

    const liElement2 =  $("<li></li>").addClass('list-group-item').text('Model: ' + (capacityData['model'] || ''));
    const liElement3 =  $("<li></li>").addClass('list-group-item').text("bogoMIPS: " + (capacityData['bogomips'] || ''));
    ulElement.append(liElement1, liElement2, liElement3);

    $(this.divName).append(ulElement);
};
