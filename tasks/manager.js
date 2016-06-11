'use strict';

const schedule = require('node-schedule');
const baseHook = require('../hooks/base');

const weather = require('./weather');

const tasks = [
    {
        time: {hour: 5, minute: 0},
        task: () => {
            baseHook.sendHook();
        }
    },
    weather
];

function init() {
    tasks.forEach((task) => {
        task.times.forEach((time) => {
            schedule.scheduleJob(task.time, task.task);
        });
    });
}

module.exports = {
    init
};
