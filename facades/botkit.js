'use strict';

const Botkit = require('botkit');
const constants = require('../utils/constants');
const Promise = require('bluebird');
const santo = require('../urls/santo');
const BotkitModel = require('../models/botkit');

function start() {
    return new Promise((resolve, reject) => {
        let controller = Botkit.slackbot({
            debug: constants.get('botkit.debug'),
            url: santo // only 1 webhook
        });

        let bot = controller.spawn({
            token: constants.get('slack.token')
        }).startRTM((err) => {
            if (err) {
                reject(new Error(err));
                return;
            }

            resolve(new BotkitModel(controller, bot));
        });
    });
}

module.exports = {
    start
};
