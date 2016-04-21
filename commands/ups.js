'use strict';

const ups = require('../facades/ups');

module.exports = {
    patterns: ['track (\w)$'],
    messageType: ['direct_message', 'direct_mention', 'mention'],
    callback: (bot, message) => {
        let trackingNumber = message.match[1];

        bot.reply(message, `ok, will track ${trackingNumber}`);

        ups.trackPackage(trackingNumber).then((trackingInfo) => {
            bot.reply(message, trackingInfo);
        }).catch(() => {
            bot.reply(message, 'unable to get tracking information');
        });
    }
};

