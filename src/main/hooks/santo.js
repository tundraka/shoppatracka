'use strict';

const santoWebhookUrl = require('../urls/santo');
const base = require('./base');

function send(message) {
    base.sendHook(santoWebhookUrl, message);
}

module.exports = {
    send
};
