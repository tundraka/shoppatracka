'use strict';

const Botkit = require('botkit');
const constants = require('../utils/constants');
const Promise = require('bluebird');

function start() {
    return new Promise((resolve, reject) => {
        let shoppatracka = Botkit.slackbot({
            debug: constants.get('botkit.debug')
        });

        shoppatracka.spawn({
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
