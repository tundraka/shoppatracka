'use strict';

const schedule = require('node-schedule');
const moment = require('moment');

function init(bot) {
    schedule.scheduleJob('* * */1 * * *', () => {
        bot.startPrivateConversation({user: 'jeziel'}, (err, convo) => {
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
