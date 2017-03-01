var express = require('express');

var qaReporter = require('../models/QaReporter');

var router = express.Router();

router.get('/project/:testproject*', function(req, res, next) {

    var testProject = req.params.testproject + req.params[0];

    qaReporter.reportByTestProject(testProject, function(data) {
        console.log(data);
    });
});

module.exports = router;
