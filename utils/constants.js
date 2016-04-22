'use strict';

const constants = {
    google: {
        tokens: process.env.google_token,
        secret: process.env.google_secret,
        calendar: {
            version: 'v3',
            calendarid: process.env.google_calendarid, // primary
            scope: {
                ro: ['https://www.googleapis.com/auth/calendar.readonly'],
                rw: ['https://www.googleapis.com/auth/calendar']
            }
        }
    },
    ups: {
        accesskey: process.env.upsAccessKey,
        username: process.env.upsUserName,
        password: process.env.upsPassword,
        ua: 'shoppatracka 0.1',
        env: 'live'
    },
    forecastio: {
        key: process.env.forecastiokey,
        timeout: 2500
    },
    dates: {
        defaultFormat: 'dddd [the] Do [at] LT', // "Sunday the 12th at 4:41 PM"
        fullDay: 'dddd [the] Do' // "Sunday the  12th"
    }
};

module.exports = constants;
