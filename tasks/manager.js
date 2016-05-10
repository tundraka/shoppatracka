'use strict';

const schedule = require('node-schedule');
//const moment = require('moment');
const log = require('../utils/log').getLog('task.manager');

function init() {
    schedule.scheduleJob('* * */1 * * *', () => {
        log.info('I am here.');
        //let now = moment().format();
        //bot.say(`I am here, it's ${now}`);
    });
}

module.exports = {
    init
};
