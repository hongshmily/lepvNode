var express = require('express');
var request = require('request');
var qaCodeManager = require('../models/TestDefinition');
var qaCodeWalker = require('../models/QaRepoWalker');

var router = express.Router();

router.get('/gettestmethodinfo/:class/:method/:project*', function(req, res, next) {

    // com.marin.qa.smartsync.SmartSyncRollbackTest
    var className = req.params.class;

    // smartSyncUnlinkTest
    var methodName = req.params.method;

    // project project: int/tests/qa-smart-sync-tests/
    var projectPath = req.params.project + req.params[0];

    qaCodeManager.getTestMethodInfo(className, methodName, projectPath, function(testMethodInfo) {
        res.json(testMethodInfo);
    });
});

router.get('/gettestclasses/:projectname*', function(req, res, next) {
    //
    // // project name like: qa-smart-sync-tests
    // var testProjectName = req.params.projectname + req.params[0];
    //
    // qaCodeManager.get(testProjectName, function(testClassInfos) {
    //     res.json(testClassInfos);
    //     next();
    // });
});

router.get('/testfiles/:projectname*', function(req, res, next) {

    // project name like: qa-smart-sync-tests
    var testProjectName = req.params.projectname + req.params[0];

    qaCodeWalker.getTestClassFilesByProjectName(testProjectName, function(testClasseFiles) {
        res.json(testClasseFiles);
    });
});

router.get('/testprojects', function(req, res, next) {

    qaCodeWalker.getAllTestProjects(function(testProjets) {
        res.json(testProjets);
    });
});

router.get('/gettestclassinfos/:classfilepath*', function(req, res, next) {

    // project project: int/tests/qa-smart-sync-tests/
    var testClassFilePath = '/' + req.params.classfilepath + req.params[0];

    qaCodeManager.getTestClassInfosByClassFilePath(testClassFilePath, function(testClassInfos) {
        res.json(testClassInfos);
    });
});

router.get('/istestfile/:classfilepath*', function(req, res, next) {

    // project project: int/tests/qa-smart-sync-tests/
    var testClassFilePath = '/' + req.params.classfilepath + req.params[0];

    qaCodeManager.isValidTestClass(testClassFilePath, function(isValid) {
        res.json({isValidTestClass: isValid});
    });
});

router.get('/gettestdefinitions/:testJsonFullFile*', function(req, res, next) {

    var testJsonFileFullPath =  '/' + req.params.testJsonFullFile + req.params[0];

    qaCodeManager.getTestDefinitions(testJsonFileFullPath, function(testDefinitions) {
        res.json(testDefinitions);
    });
});

module.exports = router;
