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
    return upsApi.trackAsync('1Z5466360394880552o', {latest: true}).then((result) => {
        console.log(JSON.stringify(result));
        // TODO. I'm not considering the case when the tracking code doesn't
        // exist.
        let activity = result.Shipment.Package.Activity;
        if (Array.isArray(activity) && activity.length > 0) {
            activity.date || '';
            activity.time || '';
        }
    }).catch((e) => {
        console.log(JSON.stringify(e));
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
