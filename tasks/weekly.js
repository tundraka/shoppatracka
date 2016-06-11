'use strict';

const calendar = require('../utils/calendarEvents');
const santo = require('../hooks/santo');

module.exports = {
    time: {dayOfWeek: 0, hour: 19, minute: 30},
    task: () => {
        calendar.getNextWeekEvents().then((events) => {
            if (Array.isArray(events) && events.length > 0) {
                let message = events.map((event) => event.toString()).join('\n').trim();
                santo.send(`Next week events!\n${message}`);
            }
        });
    }
};

