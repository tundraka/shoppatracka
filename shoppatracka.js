'use strict';

var Botkit = require('botkit');
var forecast = require('./forecast');
var ups = require('./ups');

var botMention = ['direct_message', 'direct_mention', 'mention'];

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

controller.hears(['weather'], botMention, (bot, message) => {
    var coordinates = location.getCoordinatesByPlaceName('austin');

    bot.reply(message, 'Working on it!');

    forecast.getCurrentForecastfetch(coordinates.lat, coordinates.lng).
        then((result) => {
        var description = result.hourly.summary;
        var farenheit = result.currently.temperature;
        var celsius = Math.round(temperature.f2c(farenheit));
        var windSpeed = result.currently.windSpeed;
        var windDirection = result.currently.windBearing;
        var bearingName = getBearingFromAngle(windDirection);
        var botReply = `It is ${farenheit} F (${celsius} C), ${description} Wind speed of ${windSpeed} mph towards ${bearingName}`;
        
        bot.reply(message, botReply);
    }).
        catch((error) => {
        console.log('unable to fetch weather information');
        console.log(error);

        bot.reply(message, 'Shade! Unable to fetch weather, please repeat the question.');
    });
});

controller.hears(['track (\w+)$'], botMention, (bot, message) => {
    var trackingNumer = message.match[1];

    bot.reply(`ok, will track ${trackingNumer}`);

    ups.trackPackage(trackingNumber).then((trackingInfo) => {
        bot.reply(trackingInfo);
    }).catch(() => {
        bot.reply('unable to get tracking information');
    });
});

controller.hears(['dm me'], botMention,function(bot,message) {
    bot.startConversation(message,function(err,convo) {
        convo.say('Heard ya');
    });

    bot.startPrivateConversation(message,function(err,dm) {
        dm.say('Private reply!');
    });
});

