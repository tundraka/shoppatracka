'use strict';

const location = require('./location');
const forecast = require('./forecast');

module.exports = {
    patterns: ['weather'],
    messageType: ['direct_message', 'direct_mention', 'mention'],
    callback: (bot, mention) => {
        var coordinates = location.getCoordinatesByPlaceName('austin');

        bot.reply(message, 'Working on it!');

        forecast.getCurrentForecast(coordinates).then((result) => {
            bot.reply(message, result);
        }).catch((error) => {
            console.log('unable to fetch weather information');
            console.log(error);

            bot.reply(message, 'Shade! Unable to fetch weather, please repeat the question.');
        });
    }
};
