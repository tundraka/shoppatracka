'use strict';

const constants = {
    google: {
        tokens: process.env.google_token,
        secret: process.env.google_secret,
        calendar: {
            version: 'v3',
            calendarid: process.env.google_calendarid, // primary
            scope: ['https://www.googleapis.com/auth/calendar.readonly']
        }
    }
};

module.exports = constants;
