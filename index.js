var Botkit = require('botkit');
var ForecastIo = require('forecast.io-bluebird');
var forecastIo = new ForecastIo({
    key: process.env.forecastiokey,
    timeout: 2500
});
var austinlat = '30.267153';
var austinlong = '-97.743061';


if (!process.env.token || !process.env.forecastiokey) {
  console.log('Error: Specify: token | forecastiokey. In environment');
  process.exit(1);
}

var controller = Botkit.slackbot({debug: false});

controller.spawn({
  token: process.env.token
}).startRTM(function(err) {
  if (err) {
    throw new Error(err);
  }
});


controller.hears(['hello','hi'],['direct_message','direct_mention','mention'], (bot,message) => {
    bot.reply(message,"Hello.");
});

controller.hears(['weather'],['direct_message', 'direct_mention', 'mention'], (bot, message) => {
});

controller.hears(['dm me'],['direct_message','direct_mention'],function(bot,message) {
  bot.startConversation(message,function(err,convo) {
    convo.say('Heard ya');
  });

  bot.startPrivateConversation(message,function(err,dm) {
    dm.say('Private reply!');
  });

});

