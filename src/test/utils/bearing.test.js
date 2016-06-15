'use strict';

let bearing = require('../../main/utils/bearing');

describe('bearing', () => {
    it('doesn\'t know about a bearing smaller than 0', () => {
        expect(bearing(-1)).toBe('I don\'t know about bearing -1.');
    });

    it('doesn\'t know about a bearing greater than 360', () => {
        expect(bearing(361)).toBe('I don\'t know about bearing 361.');
    });

    it('provides a bearing for a valid angle', () => {
        expect(bearing(0)).toBe('North');
        expect(bearing(360)).toBe('North');
        expect(bearing(90)).toBe('East');
    });
});
