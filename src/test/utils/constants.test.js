'use strict';

const constants = require('../../main/utils/constants');

describe('constants', () => {
    it('returns a constant value', function() {
        expect(constants.get('test.valueStr')).toBe('value');
    });

    it('booleans', () => {
        expect(constants.get('test.bool.t')).toBe(true);
        expect(constants.get('test.bool.t1')).toBe(true);
        expect(constants.get('test.bool.f')).toBe(false);
        expect(constants.get('test.bool.f1')).toBe(false);
        expect(constants.get('test.bool.f2')).toBe(false);
        expect(constants.get('test.bool.f3')).toBe(false);
    });

    it('objects', () => {
        expect(constants.get('test.valueObj')).toEqual({a: 1});
        expect(constants.get('test.valueObj.a')).toEqual(1);
    });

    it('returns a value', () => {
        expect(constants.get('non.existent')).not.toBeDefined();
    });

    it('values are read only', () => {
        let a = constants.get('test.valueStr');

        expect(a).toBe('value');
        a = 'hello';
        expect(constants.get('test.valueStr')).toBe('value');
    });
});
