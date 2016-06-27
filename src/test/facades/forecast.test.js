'use strict';

const forecast = require('../../main/facades/forecast');
const location = require('../../main/facades/location');

describe('Forecast', () => {
    it('call coordinates', function() {
        spyOn(location, 'getCoordinatesByPlaceName');
        forecast.getCurrentForecast(null);
        expect(location.getCoordinatesByPlaceName).toHaveBeenCalled();
    });
});
