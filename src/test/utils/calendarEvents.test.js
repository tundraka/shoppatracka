'use strict';

const calendarEvents = require('../../main/utils/calendarEvents');
const momento = require('moment');
const calendar = require('../../main/facades/google/calendar');

describe('calendarEvents', () => {
    it('calls calendar with next week dates', function() {
        var moment = jasmine.createSpy('moment');

        //calendarEvents.prototype.moment = moment;
        console.log(JSON.stringify(calendarEvents));
        moment.and.callFake(() => {});
        spyOn(calendar, 'getEvents');
        calendarEvents.getNextWeekEvents();
        var a = new Date('Sat Jun 25 2016 00:00:00 GMT-0500');
        var b = new Date('Fri Jun 24 2016 22:36:18 GMT-0500');

        expect(calendar.getEvents).toHaveBeenCalledWith(a, b);
    });
});
