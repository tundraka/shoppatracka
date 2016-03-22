'use strict';

const Botkit = require('botkit');
const ups = require('./ups');

const botMention = ['direct_message', 'direct_mention', 'mention'];

if (!process.env.token || !process.env.forecastiokey) {
  console.log('Error: Specify: token | forecastiokey. In environment');
  process.exit(1);
}

var shoppatracka = Botkit.slackbot({debug: false});

shoppatracka.spawn({
  token: process.env.token
}).startRTM(function(err) {
  if (err) {
    throw new Error(err);
  }
});

shoppatracka.hears(['weather'], botMention, (bot, message) => {

shoppatracka.hears(['track (\w+)$'], botMention, (bot, message) => {
    var trackingNumer = message.match[1];

    bot.reply(`ok, will track ${trackingNumer}`);

    ups.trackPackage(trackingNumber).then((trackingInfo) => {
        bot.reply(trackingInfo);
    }).catch(() => {
        bot.reply('unable to get tracking information');
    });
});

shoppatracka.hears(['dm me'], botMention,function(bot,message) {
    bot.startConversation(message,function(err,convo) {
        convo.say('Heard ya');
    });

    bot.startPrivateConversation(message,function(err,dm) {
        dm.say('Private reply!');
    });
});

