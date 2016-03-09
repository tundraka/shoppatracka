'use strict';

var Promise = require("bluebird");
var UpsApi = require('shipping-ups');

var upsApi = new UpsApi({
    environment: 'live',
    access_key: process.env.upsAccessKey,
    username: process.env.upsUserName,
    password: process.env.upsPassword,
    user_agent: 'shoppatracka 0.1'
});

Promise.promisifyAll(upsApi);

function trackPackage(trackingNumber) {
    return upsApi.trackAsync('1Z5466360394880552', {latest: true}).then((result) => {
        console.log(JSON.stringify(result));
    });
}

module.exports = {
    trackPackage
};

trackPackage().then(() => {
    console.log('hey');
}).catch((err) => {
    console.log('hey');
    console.log(JSON.stringify(err));
});
