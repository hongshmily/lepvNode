var express = require('express');

var path = require('path');
var mongo = require('../models/Mongo');
var jenkins = require('../models/Jenkins');
var qaCodeWalker = require("../models/QaRepoWalker");

var router = express.Router();


router.get('/result/:project/:class/:method/:case*', function(req, res, next) {

    var projectName = req.params.project;
    var testClass = req.params.class;
    var methodName = req.params.method;
    var testCase = req.params.case + req.params[0];
    if (testCase.startsWith('SLASH')) {
        testCase = testCase.replace("SLASH", "/");
    }

    var projectPom = qaCodeWalker.getPomPathByProjectName(projectName);
    var queryConditions = {
        className : testClass,
        testMethod : methodName,
        testCase: testCase,
        POM_PATH: projectPom
    };

    console.log("Query test case results by: ");
    console.log(queryConditions);

    if (testClass == 'com.marin.qa.bulk.BulkGroupTest') {
        var sdf = "";
    }

    mongo.queryTestResult(queryConditions, function(results) {
        res.json(results);
    });
});

router.get('/resultbyclasspath/:testfile*', function(req, res, next) {

    var testFile = req.params.testfile + req.params[0];

    // from: /Users/mxu/workspace/qa/int/tests/qa-bulk-bing-tests/src/test/java/com/marin/qa/bulk/BulkLargeSitelinksForBingTest.java
    // get the class name like: com.marin.qa.smartsync.SmartSyncNonU2Test
    // and project name like qa-bulk-bing-tests
    // and deduce the pom path like int/tests/qa-smart-sync-tests/pom.xml

    // then query by "className" and "POM_PATH"
    testFile += '/';

    var pomPath = qaCodeWalker.getPomPathByTestFilePath(testFile);
    var className = qaCodeWalker.getClassNameByPath(testFile);

    mongo.queryByClassNameAndPomPath(className, pomPath, function(results) {
        if (results == null) {
            res.json({});
        } else {
            res.json(results);
        }
    });
});

router.post('/scrape/:jenkinsview*', function(req, res, next) {

    var jenkinsViewurl = req.params.jenkinsview + req.params[0];

    if (!jenkinsViewurl.endsWith('/')) {
        jenkinsViewurl += '/';
    }

    if (jenkins.isViewUrl(jenkinsViewurl)) {
        console.log("this is a Jenkins View URL: " + jenkinsViewurl);
        mongo.mongoTestCasesByJenkinsView(jenkinsViewurl, function(err, result) {
            res.json(result);
        });
    } else if (jenkins.isJobUrl(jenkinsViewurl)) {
        console.log("this is a Jenkins job URL: " + jenkinsViewurl);
        mongo.mongoTestCasesByJenkinsJob(jenkinsViewurl, function(err, result) {
            res.json(result);
        });
    } else {
        console.log("This url is not of a job, neither of a view: " + jenkinsViewurl);
    }
});


router.post('/scrapejobdata/:jenkinsview*', function(req, res, next) {

    var jenkinsViewurl = req.params.jenkinsview + req.params[0];

    if (!jenkinsViewurl.endsWith('/')) {
        jenkinsViewurl += '/';
    }

    if (jenkins.isViewUrl(jenkinsViewurl)) {
        console.log("this is a Jenkins View URL: " + jenkinsViewurl);
        mongo.mongoTestCasesByJenkinsView(jenkinsViewurl, function(err, result) {
            res.json(result);
        });
    } else if (jenkins.isJobUrl(jenkinsViewurl)) {
        console.log("this is a Jenkins job URL: " + jenkinsViewurl);
        mongo.mongoTestCasesByJenkinsJob(jenkinsViewurl, function(err, result) {
            res.json(result);
        });
    } else {
        console.log("This url is not of a job, neither of a view: " + jenkinsViewurl);
    }
});


module.exports = router;
