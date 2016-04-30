'use strict';

const Promise = require('bluebird');
const UpsApi = require('shipping-ups');
const constants = require('../utils');

const upsApi = new UpsApi({
    environment: constants.get('ups.env'),
    access_key: constants.get('ups.accesskey'),
    username: constants.get('ups.username'),
    password: constants.get('ups.password'),
    user_agent: constants.get('ups.ua')
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
