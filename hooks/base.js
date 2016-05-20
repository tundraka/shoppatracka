'use strict';

const constants = require('../utils/constants');
const payload = {
    channel: constants.get('slack.default.channel'),
    username: constants.get('slack.default.user'),
    text: ''
};

// NOTES: 
// Links in the webhook, after the pipe is
// <https://alert-system.com/alerts/1234|Click here>

function sendHook() {
}

module.exports = {
    sendHook
};
