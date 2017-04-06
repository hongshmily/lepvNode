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

    it('getProcessorCount should get the processor count info', function(done) {

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

    it('GetCmdTop');
    it('GetAverageLoad');
    it('GetProcCpuinfo');
    it('GetCapacity');
    it('GetCmdMpstat');
});