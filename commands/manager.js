'use strict';

const weather = require('./weather');
const ups = require('./ups');

const commands = [
    weather,
    ups
];

function init(bot) {
    commands.forEach((command) => {
        bot.hears(command.patterns, command.messageType, command.callback);
    });
}

module.exports = {
    init
};
