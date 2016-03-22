'use strict';

const commands = [
    require('./weather')
];

function init(bot) {
    commands.forEach((command) => {
        bot.hears(command.patterns, command.messageType, command.callback);
    });
}

module.exports = {
    init
};
