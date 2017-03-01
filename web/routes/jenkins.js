var express = require('express');
var request = require('request');
var underScore = require('underscore');

var jenkinsManager = require('../models/Jenkins');

var router = express.Router();

router.get('/view/jobs/:url*', function(req, res, next) {
    var url = encodeURI(req.params.url + req.params[0]);
    console.log(url);

    jenkinsManager.getJobsOfView(url, function(data) {

        res.json(data);
    });

});

// url is the test report url like this:
// http://qa-build.marinsoftware.com/job/qa2-bulk-bing-bulk-service-sync-tests-master/lastCompletedBuild/testReport/api/json?pretty=true
router.get('/report/:url*', function(req, res, next) {
    var url = encodeURI(req.params.url + req.params[0]);
    console.log(url);

    jenkinsManager.getTestReport(url, function(data) {

        res.json(data);
    });

});

router.get('/job/:url*', function(req, res, next) {
    var url = encodeURI(req.params.url + req.params[0]);
    console.log(url);

    // if the specified url is of a build, get its job url, we are tolerant
    url = url.replace(/\/\d+\/?$/g, '/');

    jenkinsManager.getJobData(url, function(data) {

        // and get the job configs as well
        jenkinsManager.getJobConfigs(url, function(configData) {

            // merge the two.
            var mergedJobData = underScore.extend(data, configData);
            mergedJobData['lastBuildNumber'] = mergedJobData.nextBuildNumber - 1;
            mergedJobData['projectPath'] = mergedJobData.POM_PATH.replace('/pom.xml', '');

            res.json(mergedJobData);
        });
    });

});

router.get('/build/cases/:buildUlr*', function(req, res, next) {

    var url = encodeURI(req.params.buildUlr + req.params[0]);
    console.log(url);

    jenkinsManager.getTestCasesInfos(url, function(data) {
        res.json(data);
    });
});

router.get('/build/:url*', function(req, res, next) {

    var url = encodeURI(req.params.url + req.params[0]);
    console.log(url);

    jenkinsManager.getBuildLogData(url, function(data) {
        res.json(data);
    });
});

router.get('/log/:url*', function(req, res, next) {

    var url = encodeURI(req.params.url + req.params[0]);
    console.log(url);

    jenkinsManager.getBuildLogData(url, function(data) {
        res.json(data);
    });
});

module.exports = router;
