'use strict';

const calendar = require('../utils/calendarEvents');

module.exports = {
    patterns: ['calendar'],
    messageType: ['direct_message', 'direct_mention', 'mention'],
    callback: (bot, message) => {
        calendar.getTodaysEvents().then((result) => {
            bot.reply(message, `Reading from calendar ${result.summary}:${result.description}`);
            result.items.forEach((item) => {
                bot.reply(message, item.toString());
            });
        });
    }
};

