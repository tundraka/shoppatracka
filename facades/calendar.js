'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const constants = require('../utils/constants');
const clientToken = require(constants.google.tokens);
const secret = require(constats.google.tokens);
const oauth2Client = new auth.OAuth2(secret.installed.clientId,
                                     secret.installed.clientSecret,
                                     secret.installed.redirectUrl);

function getSecret() {
    let creds = {};

    fs.readFileAsync(constants.google.secret).
        then((content) => {
        creds.secret = JSON.parse(content);
    });
}

function getToken() {
}

function getEvents() {
    let secret = getSecret();
    let token = getToken();
}

module.exports = {
    getEvents
};
