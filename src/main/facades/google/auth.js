'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const constants = require('../../utils/constants');

const googleAuth = require('google-auth-library');

function auth() {
    let creds = {};

    return fs.readFileAsync(constants.get('google.secret')).then((content) => {
        creds = JSON.parse(content);
    }).then(() => {
        return fs.readFileAsync(constants.get('google.tokens'));
    }).then((content) => {
        const auth = new googleAuth();
        let oauth2Client = new auth.OAuth2(creds.installed.client_id,
                               creds.installed.client_secret,
                               creds.installed.redirect_uris[0]);
        oauth2Client.credentials = JSON.parse(content);

        return oauth2Client;
    });
}

module.exports = {
    auth
}
