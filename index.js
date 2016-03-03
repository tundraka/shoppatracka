var Botkit = require('botkit');
var forecastIo = require('./forecast');
var location = require('./location');
var getBearingFromAngle = require('./bearing');
var temperature = require('./temperature');

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

    bot.reply(message, 'Working on it!');

    forecastIo.fetch(coordinates.lat, coordinates.lng).
        then((result) => {
        var description = result.hourly.summary;
        var farenheit = result.currently.temperature;
        var celsius = temperature.f2c(farenheit);
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

controller.hears(['dm me'],['direct_message','direct_mention'],function(bot,message) {
  bot.startConversation(message,function(err,convo) {
    convo.say('Heard ya');
  });

  bot.startPrivateConversation(message,function(err,dm) {
    dm.say('Private reply!');
  });

});

