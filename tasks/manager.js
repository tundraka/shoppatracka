'use strict';

const schedule = require('node-schedule');

// tasks
const weather = require('./weather');
const weekly = require('./weekly');
const daily = require('./daily');

const tasks = [
    weather,
    weekly,
    daily
];

function init() {
    tasks.forEach((task) => {
        schedule.scheduleJob(task.time, task.task);
    });
}

module.exports = {
    init
};
