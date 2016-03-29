'use strict';

const Promise = require('bluebird');
const UpsApi = require('shipping-ups');

const upsApi = new UpsApi({
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
        let shipment = result.Shipment
        let activity = shipment.Package.Activity;

        if (activity) {
            let date = activity.Date || '';
            let time = activity.Time || '';
            let place = activity.ActivityLocation.Address.City || '';
            let scheduledDelivery = shipment.ScheduledDeliveryDate;
            //let statusCode = activity.Status.StatusType.Code || '';
            let statusDescription = activity.Status.StatusType.Description || '';

            return `Last activity on ${date}-${time} at ${place}, ${statusDescription} scheduled delivery ${scheduledDelivery}`
        }

        return 'no activity';
    });
}

module.exports = {
    trackPackage
};
