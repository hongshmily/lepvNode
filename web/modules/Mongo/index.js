
//lets require/import the mongodb native drivers.
const dbModule = require('../../db');
const lepvUtil = require('../Utility');

const properties = require('../../properties.json');

var Mongo = function() {

    this.localMongoUrl = properties.local_mongodb_address;
    this.remoteMongoUrl = properties.remote_mongodb_address;

    this.cases = null;
    this.builds = null;
};

Mongo.prototype.get = function(callback) {
    var thisManager = this;

    if ( !dbModule.get()) {
        dbModule.connect(thisManager.localMongoUrl, function(err) {
            if (err) {
                console.log('Unable to connect to Mongo.');
                process.exit(1)
            } else {
                console.log('Connected to Mongo DB.........');

                thisManager.cases = dbModule.get().collection('cases');
                thisManager.builds = dbModule.get().collection('builds');

                callback();

            }
        })
    } else {
        thisManager.cases = dbModule.get().collection('cases');
        thisManager.builds = dbModule.get().collection('builds');

        callback();
    }
};


Mongo.prototype.createCollection = function(colletionName, callback) {

    var thisMongo = this;

    thisMongo.get(function() {

        dbModule.get().createCollection(colletionName, function(err, newCollection) {
            callback(colletionName)
        })

    });
};

Mongo.prototype.getCollection = function(colletionName, callback) {

    const thisMongo = this;
    thisMongo.get(function() {

        const collection = dbModule.get().collection(colletionName);
        if (collection) {
            callback(collection);
        } else {
            thisMongo.createCollection(colletionName, callback);
        }
    });
};


Mongo.prototype.addProfileData = function(scenarioTitle, profileData, callback) {

    const thisMongo = this;

    scenarioTitle = scenarioTitle || lepvUtil.generateDateString();

    thisMongo.getCollection(scenarioTitle, function(newCollection) {

        newCollection.insert(

            profileData,

            function( err, result ) {
                if (err) {
                    callback(err.message);
                } else {
                    callback("Done!");
                }
            }
        );
    });


};


module.exports = new Mongo();
