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
    return upsApi.trackAsync(trackingNumber, {latest: true}).then((result) => {
        // TODO. I'm not considering the case when the tracking code doesn't
        // exist.
        let activity = result.Shipment.Package.Activity;
        if (Array.isArray(activity) && activity.length > 0) {
            let date = activity.date || '';
            let time = activity.time || '';
            let place = activity.ActivityLocation.Address.City || '';
            let statusCode = activity.Status.StatusType.Code || '';
            let statusDescription = activity.Status.StatusType.Description || '';
        }
    });
}

module.exports = {
    trackPackage
};

trackPackage('1Z5466360394880552').then(() => {
    console.log('hey');
}).catch((err) => {
    console.log('hey');
    console.log(JSON.stringify(err));
});
