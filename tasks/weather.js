'use strict';

const weather = require('../facades/forecast');
const santo = require('../hooks/santo');

module.exports = {
    times: {hour: [7, 17], minute: 0},
    task: () => {
        weather.getCurrentForecast('austin').then((result) => {
            // the webhook (santo), should it be an extra param of sendHook?
            // Santo, and any other webhook will have the same implementation
            // that we have in base.
            santo.send(result);
        });
    }
};
