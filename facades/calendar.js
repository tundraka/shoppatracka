'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const constants = require('../utils/constants');
const googleAuth = require('google-auth-library');

function getAuthInfo() {
    let creds = {};

    return fs.readFileAsync(constants.google.secret).then((content) => {
        creds.secret = JSON.parse(content);
    }).then(() => {
        return fs.readFileAsync(constants.google.tokens);
    }).then((content) => {
        const auth = new googleAuth();
        let oauth2Client = new auth.OAuth2(content.secret.installed.clientId,
                               content.secret.installed.clientSecret,
                               content.secret.installed.redirectUrl);
        oauth2Client.credentials = JSON.parse(content);

        return oauth2Client;
    });
}

function getEvents() {
    getAuthInfo().then((authInfo) => {
    }).catch((err) => {
    });
}

module.exports = {
    getEvents
};
