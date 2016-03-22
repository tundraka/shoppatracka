'use strict';

const ups = require('../facades/ups');

module.exports = {
    patterns: ['track (\w+)$'],
    messageType: ['direct_message', 'direct_mention', 'mention'],
    callback: (bot, mention) => {
        var trackingNumer = message.match[1];

        bot.reply(`ok, will track ${trackingNumer}`);

        ups.trackPackage(trackingNumber).then((trackingInfo) => {
            bot.reply(trackingInfo);
        }).catch(() => {
            bot.reply('unable to get tracking information');
        });
    }
};

