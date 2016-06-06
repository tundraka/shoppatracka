'use strict';

const Promise = require('bluebird');

const constants = require('../../utils/constants');
const gAuth = require('./auth');
const Item = require('../../models/calendar/item');

const events = Promise.promisifyAll(require('googleapis').calendar(constants.get('google.calendar.version')).events);
const calendarListConfiguration = {
    auth: null, // define later
    timeMin: null,
    timeMax: null,
    calendarId: constants.get('google.calendar.calendarid'),
    singleEvents: true,
    orderBy: 'startTime'
};

function getEvents(start, end) {
    return gAuth.auth().then((authInfo) => {
        calendarListConfiguration.auth = authInfo;
        calendarListConfiguration.timeMin = start.toJSON();
        calendarListConfiguration.timeMax = end.toJSON();

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

module.exports = {
    getEvents
};
