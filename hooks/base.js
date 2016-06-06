'use strict';

const request = require('request');
const santoWebhookUrl = require('../urls/santo');
const payload = {
    text: ''
};

// NOTES: 
// Links in the webhook, after the pipe is
// <https://alert-system.com/alerts/1234|Click here>

function sendHook(message) {
    payload.text = message;
    request.post(santoWebhookUrl, {form: {payload: JSON.stringify(payload)}});
}

module.exports = {
    sendHook
};
