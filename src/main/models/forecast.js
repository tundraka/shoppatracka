'use strict';

const temperature = require('../utils/temperature');
const getBearingFromAngle = require('../utils/bearing');

class Forecast {
    constructor(forecast) {
        this.description = forecast.hourly.summary;
        this.farenheit = forecast.currently.temperature;
        this.celsius = Math.round(temperature.f2c(this.farenheit));
        this.windSpeed = forecast.currently.windSpeed;
        this.windDirection = forecast.currently.windBearing;
        this.bearingName = getBearingFromAngle(this.windDirection);
    }

    toString() {
        return `It is ${this.farenheit} F (${this.celsius} C), ${this.description} Wind speed of ${this.windSpeed} mph ${this.bearingName}`;
    }
}

module.exports = Forecast;
