'use strict';

const schedule = require('node-schedule');
//const moment = require('moment');
const log = require('../utils/log').getLog('task.manager');
const constants = require('../utils/constants');

function init(bot) {
    schedule.scheduleJob('* 0 * * * *', () => {
        log.info('I am here.');
        bot.sendWebhook({
            text: 'Testing webhook',
            channel: constants.get('slack.defaultchannel')
        });
        //let now = moment().format();
        //bot.say(`I am here, it's ${now}`);
    });
}

module.exports = {
    init
};
