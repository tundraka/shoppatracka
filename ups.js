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
        console.log(JSON.stringify(result));

        let shipment = result.Shipment
        let activity = shipment.Package.Activity;

        if (activity) {
            let date = activity.Date || '';
            let time = activity.Time || '';
            let place = activity.ActivityLocation.Address.City || '';
            let scheduledDelivery = shipment.ScheduledDeliveryDate;
            let statusCode = activity.Status.StatusType.Code || '';
            let statusDescription = activity.Status.StatusType.Description || '';

            return `Last activity on ${date}-${time} at ${place}, ${statusDescription} scheduled delivery ${scheduledDelivery}`
        }

        return 'no activity';
    });
}

module.exports = {
    trackPackage
};

trackPackage('').then((status) => {
    console.log(status);
}).catch((err) => {
    console.log('hey');
    console.log(JSON.stringify(err));
});
