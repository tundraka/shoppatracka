'use strict';

const schedule = require('node-schedule');
const constants = require('../utils/constants');
const moment = require('moment');

function init(bot) {
    schedule.scheduleJob('* * */1 * * *', () => {
        let now = moment().format();
        bot.say(`I am here, it's ${now}`);
    });
}

module.exports = {
    init
};
