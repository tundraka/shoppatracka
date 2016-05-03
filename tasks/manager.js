'use strict';

const schedule = require('node-schedule');
const constants = require('../utils/constants');
const moment = require('moment');

function init(bot) {
    schedule.scheduleJob('* * */1 * * *', () => {
        bot.startPrivateConversation({user: constants.get('slack.user')}, (err, convo) => {
            if (err) {
                // TODO logs?
                return;
            }

            let now = moment().format();
            convo.say(`I am here, it's ${now}`);
        });
    });
}

module.exports = {
    init
};
