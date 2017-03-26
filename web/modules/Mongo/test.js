/**
 * Created by mxu on 12/30/16.
 */

const mongo = require('./index');

mongo.addProfileData(null, {name: "mxu"}, function (response) {
    console.log(response);
});