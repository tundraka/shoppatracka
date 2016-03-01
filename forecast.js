// ForecastIO: https://github.com/timelessvirtues/forecast.io-bluebird
// DarkSky API: https://developer.forecast.io/docs/v2#forecast_call
// Key: https://developer.forecast.io/

var ForecastIo = require('forecast.io-bluebird');
var forecastIo = new ForecastIo({
    key: process.env.forecastiokey,
    timeout: 2500
});

// What will be the temperature ~5pm?
// What's the weather like right now
// How's the weather his weekend
//
// {It'll be | it is} 45F (35C), clear throughout the day, wind speed of 3.69 towards the
// North
//
// temperature: result.ccurrently.temperature / celsius calculate
// c = (F - 32) * 5/9
// forecastDescription: result.hourly.summary
// windSpeed: result.currently.windSpeed
// windDirection: result.currently.windBearing

module.exports = forecastIo;
