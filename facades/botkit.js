'use strict';

const Botkit = require('botkit');
const botOptions = {debug: false};
const constants = require('../utils/constants');

function startBot() {
    let shoppatracka = Botkit.slackbot(botOptions);

    shoppatracka.spawn({
        token: constants.get('slack.token')
    }).startRTM((err) => {
        if (err) {
            throw new Error(err);
        }
    });

    return shoppatracka;
}

function start() {
    return startBot();
}

module.exports = {
    start
};
