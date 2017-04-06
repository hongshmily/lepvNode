/**
 * Created by mxu on 4/5/17.
 */

const chai = require('chai');
const should = chai.should();

const properties = require('../../properties.json');

describe('CpuMonitor', function() {

    const lepdServer = properties.remote_lepd_server;

    const options = {
        server: lepdServer,
        debug: true
    };

    const monitor = require('../../modules/CpuMonitor');

    // // within before() you can run all the operations that are needed to setup your tests
    before( function( done ) {

        done();
    });

    it('getProcessorCount', function(done) {

        const promise = monitor.getProcessorCount(options);
        promise.then( function(response) {

            // example: http://chaijs.com/guide/styles/
            response.should.be.an('object');

            response.should.have.property("data");

            const count = response.data.count;
            count.should.be.valueOf(2);

            done();
        })

    });

    it('GetCmdTop', function(done) {
        const promise = monitor.GetCmdTop(options);
        promise.then( function(response) {

            // example: http://chaijs.com/guide/styles/
            response.should.be.an('object');
            response.should.have.property("data");

            done();
        })
    });


    it('GetAverageLoad', function(done) {
        const promise = monitor.GetAverageLoad(options);
        promise.then( function(response) {

            // example: http://chaijs.com/guide/styles/
            response.should.be.an('object');
            response.should.have.property("data");

            done();
        })
    });


    it('GetProcCpuinfo', function(done) {
        const promise = monitor.GetProcCpuinfo(options);
        promise.then( function(response) {

            // example: http://chaijs.com/guide/styles/
            response.should.be.an('object');
            response.should.have.property("data");

            done();
        })
    });


    it('GetCapacity', function(done) {
        const promise = monitor.GetCapacity(options);
        promise.then( function(response) {

            // example: http://chaijs.com/guide/styles/
            response.should.be.an('object');
            response.should.have.property("data");

            done();
        })
    });


    it('GetCmdMpstat', function(done) {
        const promise = monitor.GetCmdMpstat(options);
        promise.then( function(response) {

            // example: http://chaijs.com/guide/styles/
            response.should.be.an('object');
            response.should.have.property("data");

            done();
        })
    });
});