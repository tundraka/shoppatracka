'use strict';

const getBearingFromAngle = require('../utils/bearing');
const temperature = require('../utils/temperature');

// ForecastIO: https://github.com/timelessvirtues/forecast.io-bluebird
// DarkSky API: https://developer.forecast.io/docs/v2#forecast_call
// Key: https://developer.forecast.io/

const ForecastIo = require('forecast.io-bluebird');
let forecastIo = new ForecastIo({
    key: process.env.forecastiokey,
    timeout: 2500
});

// What will be the temperature ~5pm?
// What's the weather like right now
// How's the weather his weekend
//
// {It'll be | it is} 45F (35C), clear throughout the day, wind speed of 3.69 towards the
// North

function getCurrentForecast(coordinates) {
    return forecastIo.fetch(coordinates.lat, coordinates.lng).then((result) => {
        let description = result.hourly.summary;
        let farenheit = result.currently.temperature;
        let celsius = Math.round(temperature.f2c(farenheit));
        let windSpeed = result.currently.windSpeed;
        let windDirection = result.currently.windBearing;
        let bearingName = getBearingFromAngle(windDirection);
        
        return `It is ${farenheit} F (${celsius} C), ${description} Wind speed of ${windSpeed} mph ${bearingName}`;
    });
}

module.exports = {
    getCurrentForecast
};
