'use strict';

const location = require('../facades/location');
const weather = require('../facades/forecast');
const base = require('../hooks/base');

module.exports = {
    time: {hour: [7, 17], minute: 0, dayOfWeek: 4},
    task: () => {
        let coordinates = location.getCoordinatesByPlaceName('austin');
        weather.getCurrentForecast(coordinates).then((result) => {
            base.sendHook(result);
        });
    }
};
