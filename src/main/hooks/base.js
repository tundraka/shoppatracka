'use strict';

const request = require('request');
const payload = {
    text: ''
};

// NOTES: 
// Links in the webhook, after the pipe is
// <https://alert-system.com/alerts/1234|Click here>

function sendHook(hook, message) {
    payload.text = message;
    request.post(hook, {form: {payload: JSON.stringify(payload)}});
}

module.exports = {
    sendHook
};
