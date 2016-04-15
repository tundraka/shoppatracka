'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));

const constants = require('../utils/constants');
const moment = require('moment');

const events = Promise.promisifyAll(require('googleapis').calendar(constants.google.calendar.version).events);
const googleAuth = require('google-auth-library');
const calendarListConfiguration = {
    auth: null, // define later
    calendarId: constants.google.calendar.calendarid,
    timeMin: (new Date()).toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime'
};

function getAuthInfo() {
    let creds = {};

    return fs.readFileAsync(constants.google.secret).then((content) => {
        creds = JSON.parse(content);
    }).then(() => {
        return fs.readFileAsync(constants.google.tokens);
    }).then((content) => {
        const auth = new googleAuth();
        let oauth2Client = new auth.OAuth2(creds.installed.client_id,
                               creds.installed.client_secret,
                               creds.installed.redirect_uris[0]);
        oauth2Client.credentials = JSON.parse(content);

        return oauth2Client;
    });
}

function getPeriod(item) {
    let period = {
        valid: false,
        fullDay: false,
        start: null,
        end: null,
        totalDays: 0,
        length: 0,
        when: ''
    };

    if (!item || !item.start || !item.end) {
        // TODO, log that we don't have the required data.
        return period;
    }

    // Date time
    if (item.start.dateTime && item.end.dateTime) {
        period.valid = true;
        period.fullDay = false;
        period.start = moment(item.start.dateTime);
        period.end = moment(item.end.dateTime);
        period.when = moment(period.start, moment.ISO_8601).format(constants.dates.defaultFormat);
    } else {
        // TODO, log that we don't have the start or the end.
    }

    // full days
    if (item.start.date && item.end.date) {
        period.valid = true;
        period.fullDay = true;
        period.start = moment(item.start.date);
        period.end = moment(item.end.date);
        // when totalDays == 1, no need to say how many days.
        period.totalDays = period.end.diff(period.start, 'days');
        period.when = moment(period.start, moment.ISO_8601).format(constants.dates.fullDay);
    } else {
        // TODO, log that we don't have the start or the end.
    }

    period.length = period.end.to(period.start, true);
    period.location = item.location || '';

    return period;
}

function getEvents() {
    return getAuthInfo().then((authInfo) => {
        calendarListConfiguration.auth = authInfo;
        calendarListConfiguration.timeMin = (new Date()).toISOString();

        //calendar.calendarList.list({auth: authInfo}, (err, response) => {
        return events.listAsync(calendarListConfiguration);
    }).then((response) => {
        let calendarResult = {
            summary: response.summary,
            description: response.description,
            items: []
        };

        response.items.forEach((item) => {
            let period = getPeriod(item);

            calendarResult.items.push({
                summary: item.summary,
                period
            });
        });

        return calendarResult;
    });
}

getEvents().then((result) => {
    console.log(`${result.summary}:${result.description}`);
    result.items.forEach((item) => {
        let periodLength = (item.totalDays && item.totalDays > 1)
            ? item.period.length 
            : '';
        console.log(`${item.summary} on ${item.period.when} (${periodLength})`);
    });
}).catch((err) => {
    console.log('auth error');
    console.log(err);
});

module.exports = {
    getEvents
};
