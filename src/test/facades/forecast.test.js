'use strict';

const forecast = require('../../main/facades/forecast');
const location = require('../../main/facades/location');
const constants = require('../../main/utils/constants');

describe('Forecast', () => {
    it('call coordinates', function() {
        spyOn(location, 'getCoordinatesByPlaceName');
        forecast.getCurrentForecast(null);
        expect(location.getCoordinatesByPlaceName).toHaveBeenCalled();
    });
});
