'use strict';

const constants = require('../utils/constants');
const path = require('path');

const SCOPES = constants.get('google.calendar.scope.rw');
const credentials = constants.get('google.tokens');
const tokenDir = path.dirname(credentials);

var TOKEN_DIR = tokenDir;

const readline = require('readline');
const fs = require('fs');
const googleAuth = require('google-auth-library');
const auth = new googleAuth();
const secret = require(constants.get('google.secret'));

const clientId = secret.installed.client_id;
const clientSecret = secret.installed.client_secret;
const redirectUrl = secret.installed.redirect_uris[0];

const oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

var authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
});

console.log('Authorize this app by visiting this url: ', authUrl);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oauth2Client.getToken(code, (err, token) => {
        if (err) {
            console.log('Error while trying to retrieve access token', err);
            return;
        }

        oauth2Client.credentials = token;
        storeToken(token);
    });
});


/**
 * Store token to disk be used in later program executions.
 *
 * @param {Object} token The token to store to disk.
 * @returns {null} nothing
 */
function storeToken(token) {
    try {
        fs.mkdirSync(TOKEN_DIR);
    } catch (err) {
        if (err.code !== 'EEXIST') {
            throw err;
        }
    }
    fs.writeFile(credentials, JSON.stringify(token));
    console.log('Token stored to ' + credentials);
}

