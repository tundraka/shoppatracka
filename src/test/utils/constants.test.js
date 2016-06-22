'use strict';

const constants = require('../../main/utils/constants');

describe('constants', () => {
    it('returns a constant value', function() {
        expect(constants.get('dates.defaultFormat')).toEqual(jasmine.any(String));
    });

    it('returns a value', () => {
        expect(constants.get('non.existent')).not.toBeDefined();
    });
});
