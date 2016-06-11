'use strict';

const calendar = require('../utils/calendarEvents');
const santo = require('../hooks/santo');

module.exports = {
    times: {hour: 7, minute: 30},
    task: () => {
        calendar.getTodaysEvents().then((events) => {
            if (Array.isArray(events) && events.length > 0) {
                let message = events.map((event) => event.toString()).join('\n').trim();
                santo.send(`For today we have:\n${message}`);
            }
        });
    }
};
