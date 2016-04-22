'use strict';

const Botkit = require('botkit');
const botOptions = {debug: false};
const constants = require('../utils/constants');

function validateParams() {
    if (!process.env.token || !process.env.forecastiokey) {
        console.log('Error: Specify: token | forecastiokey. In environment');
        process.exit(1);
    }
}

function startBot() {
    let shoppatracka = Botkit.slackbot(botOptions);

    shoppatracka.spawn({
        token: constants.slack.token
    }).startRTM((err) => {
        if (err) {
            throw new Error(err);
        }
    });

    return shoppatracka;
}

function start() {
    validateParams();
    return startBot();
}

module.exports = {
    start
};
