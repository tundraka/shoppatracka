'use strict';

const constants = require('../utils/constants');
const payload = {
    channel: constants.get('slack.default.channel'),
    username: constants.get('slack.default.user'),
    text: ''
};

function sendHook() {
}

module.exports = {
    sendHook
};
