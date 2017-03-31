
var mongoose = require('mongoose');
// set Promise provider to bluebird
mongoose.Promise = require('bluebird');

const properties = require('./properties.json');

var state = {
    db: null
};

exports.connect = function(url, done) {

    url = url || properties.local_mongodb_address;

    if (state.db) {
        if (done) {
            return done();
        } else {
            return;
        }
    }

    mongoose.connect(url);

    console.log("Mongoose connected");
    state.db = mongoose.connection;

    //Bind connection to error event (to get notification of connection errors)
    state.db.on('error', console.error.bind(console, 'MongoDB connection error:'));
};

exports.getDb = function() {
    return state.db;
};