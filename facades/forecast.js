'use strict';

const constants = require('../utils/constants');
const Forecast = require('../models/forecast');

// ForecastIO: https://github.com/timelessvirtues/forecast.io-bluebird
// DarkSky API: https://developer.forecast.io/docs/v2#forecast_call
// Key: https://developer.forecast.io/

const ForecastIo = require('forecast.io-bluebird');
const forecastIo = new ForecastIo({
    key: constants.get('forecastio.key'),
    timeout: constants.get('forecastio.timeout')
});

// What will be the temperature ~5pm?
// What's the weather like right now
// How's the weather his weekend

function getCurrentForecast(coordinates) {
    return forecastIo.fetch(coordinates.lat, coordinates.lng).then((result) => {
        let forecast = new Forecast(result);
        
        return forecast.toString();
    });
}

module.exports = {
    getCurrentForecast
};
