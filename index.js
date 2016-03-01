var Botkit = require('botkit');
var forecastIo = require('./forecast');
var location = require('./location');

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

controller.hears(['weather'],['direct_message', 'direct_mention', 'mention'], (bot, message) => {
    var coordinates = location.getCoordinatesByPlaceName('austin');

    forecastIo.fetch(coordinates.lat, coordinates.lng).
        then((result) => {
        var description = result.hourly.summary;
        var temperature = result.currently.temperature;
        var windSpeed = result.currently.windSpeed;
        var windDirection = result.currently.windBearing;
        var botReply = `It is ${temperature}, ${description}, wind sppe of ${windSpeed} towards ${windDirection}`;
        
        bot.reply(message, botReply);
    }).
        catch((error) => {
        console.log('unable to fetch weather information');
        console.log(error);

        bot.reply(message, 'Shade! Unable to fetch weather, please repeat the question.');
    });

});

controller.hears(['dm me'],['direct_message','direct_mention'],function(bot,message) {
  bot.startConversation(message,function(err,convo) {
    convo.say('Heard ya');
  });

  bot.startPrivateConversation(message,function(err,dm) {
    dm.say('Private reply!');
  });

});

