'use strict';

const moment = require('moment');
const calendar = require('../facades/google/calendar');

function getNextWeekEvents() {
    let start = moment().add(1, 'day').startOf('day');
    let end = moment().add(1, 'day').add(1, 'week');

    return calendar.getEvents(start, end);
}

function getTodaysEvents() {
    let start = moment();
    let end = moment().endOf('day');

    return calendar.getEvents(start, end);
}

module.exports = {
    getNextWeekEvents,
    getTodaysEvents
};
