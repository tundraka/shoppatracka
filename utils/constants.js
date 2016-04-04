'use strict';

const constants = {
    google: {
        tokens: process.env.google.token,
        secret: process.env.google.secret,
        calendar: {
            calendarid: process.env.google.calendarid,
            scope: ['https://www.googleapis.com/auth/calendar.readonly']
        }
    }
};

module.exports = constants;
