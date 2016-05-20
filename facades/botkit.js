'use strict';

const Botkit = require('botkit');
const constants = require('../utils/constants');
const Promise = require('bluebird');
const santo = require('../urls/santo');

function start() {
    return new Promise((resolve, reject) => {
        let shoppatrackaController = Botkit.slackbot({
            debug: constants.get('botkit.debug'),
            url: santo // only 1 webhook
        });

        let shoppatracka = shoppatrackaController.spawn({
            token: constants.get('slack.token')
        }).startRTM((err) => {
            if (err) {
                reject(new Error(err));
                return;
            }

            resolve(shoppatracka);
        });
    });
}

module.exports = {
    start
};
