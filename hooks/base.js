'use strict';

const moment = require('moment');
const request = require('request');
const santoWebhookUrl = require('../urls/santo');
const payload = {
    text: ''
};

// NOTES: 
// Links in the webhook, after the pipe is
// <https://alert-system.com/alerts/1234|Click here>

function sendHook() {
    let now = moment().format();

    payload.text = `this is a test ${now}`;
    request.post(santoWebhookUrl, {form: {payload: JSON.stringify(payload)}});
}

module.exports = {
    sendHook
};
