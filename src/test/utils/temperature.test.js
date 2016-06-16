'use strict';

const temperature = require('../../main/utils/temperature');

describe("temperature", () => {
    it('transforms to farenheit', () => {
        expect(temperature.c2f(37)).toBe(98.6);
    });
    
    it('transforms to celsius', () => {
        expect(temperature.f2c(98.6)).toBe(37);
    });
});
