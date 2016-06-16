'use strict';

const bearing = require('../../main/utils/bearing');

const lowerRange = -1;
const upperRange = 361;
const north = 360;
const east = 90;

describe('bearing', () => {
    it('doesn\'t know about a bearing smaller than 0', () => {
        expect(bearing(lowerRange)).toBe('I don\'t know about bearing -1.');
    });

    it('doesn\'t know about a bearing greater than 360', () => {
        expect(bearing(upperRange)).toBe('I don\'t know about bearing 361.');
    });

    it('provides a bearing for a valid angle', () => {
        expect(bearing(0)).toBe('North');
        expect(bearing(north)).toBe('North');
        expect(bearing(east)).toBe('East');
    });
});
