'use strict';

const weather = require('./weather');
const ups = require('./ups');
const calendar = require('./calendar');

const commands = [
    weather,
    ups,
    calendar
];

function init(bot) {
    commands.forEach((command) => {
        bot.hears(command.patterns, command.messageType, command.callback);
    });
}

module.exports = {
    init
};
