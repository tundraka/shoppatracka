'use strict';

const calendarEvents = require('../../main/utils/calendarEvents');
const moment = require('moment');
const calendar = require('../../main/facades/google/calendar');

describe('calendarEvents', () => {
    it('calls calendar with next week dates', function() {
       spyOn(calendar, 'getEvents');
       calendarEvents.getNextWeekEvents();

       expect(calendar.getEvents).toHaveBeenCalled();
    });
});
