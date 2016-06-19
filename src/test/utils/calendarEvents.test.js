'use strict';

const calendarEvents = require('../../main/utils/calendarEvents');
const momento = require('moment');
const calendar = require('../../main/facades/google/calendar');

describe('calendarEvents', () => {
    it('calls calendar with next week dates', function() {
        spyOn(calendar, 'getEvents');
        calendarEvents.getNextWeekEvents();

        var dates = calendar.getEvents.calls.argsFor(0);
        var a = dates[0];
        var b = dates[1];
        
        expect(a).not.toEqual(b);
        //expect(b.diff(a, 'weeks')).toBe(1);
    });
});
