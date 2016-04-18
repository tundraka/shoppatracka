'use strict';

const Promise = require('bluebird');

const constants = require('../../utils/constants');
const gAuth = require('./auth');
const Item = require('../../models/calendar/item');

const events = Promise.promisifyAll(require('googleapis').calendar(constants.google.calendar.version).events);
const calendarListConfiguration = {
    auth: null, // define later
    calendarId: constants.google.calendar.calendarid,
    timeMin: (new Date()).toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime'
};

function getEvents() {
    return gAuth.auth().then((authInfo) => {
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
            calendarResult.items.push(new Item(item));
        });

        return calendarResult;
    });
}

getEvents().then((result) => {
    console.log(`${result.summary}:${result.description}`);
    result.items.forEach((item) => {
        console.log(item.toString());
    });
}).catch((err) => {
    console.log('auth error');
    console.log(err);
});

module.exports = {
    getEvents
};
