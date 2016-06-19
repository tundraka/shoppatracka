'use strict';

const calendarEvents = require('../../main/utils/calendarEvents');
const calendar = require('../../main/facades/google/calendar');
const moment = require('moment');

describe('calendarEvents', () => {
    let getEventsSpy;

    beforeEach(() => {
        getEventsSpy = spyOn(calendar, 'getEvents');
    });

    it('calls calendar with next week dates', function() {
        calendarEvents.getNextWeekEvents();

        var dates = getEventsSpy.calls.argsFor(0);
        var start = dates[0];
        var end = dates[1];
        
        expect(start).not.toEqual(end);
        expect(end.diff(start, 'week')).toBe(1);
    });

    it('calls calendar with today\'s date', () => {
        calendarEvents.getTodaysEvents();

        let dateParam = getEventsSpy.calls.argsFor(0);
        let start = dateParam[0];
        let end = dateParam[1];
        let today = moment().day();

        expect(start).not.toBeNull();
        expect(start.day()).toEqual(today);
        expect(end.day()).toEqual(today);
        expect(end.hour()).toBe(23);
        expect(end.minute()).toBe(59);
    });
});
