'use strict';

const schedule = require('node-schedule');
//const moment = require('moment');
const log = require('../utils/log').getLog('task.manager');
const baseHook = require('../hooks/base');

function init() {
    schedule.scheduleJob('0 0 * * * *', () => {
        log.info('I am here.');
        baseHook.sendHook();
    });
}

module.exports = {
    init
};
