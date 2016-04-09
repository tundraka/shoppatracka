'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));

const constants = require('../utils/constants');

const googleapis = require('googleapis');
//const calendar = require('googleapis').calendar(constants.google.calendar.version);
const googleAuth = require('google-auth-library');
const calendarListConfiguration = {
    auth: null, // define later
    calendarId: constants.google.calendar.calendarid,
    timeMin: (new Date()).toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime'
};

function getAuthInfo() {
    let creds = {};

    return fs.readFileAsync(constants.google.secret).then((content) => {
        creds = JSON.parse(content);
    }).then(() => {
        return fs.readFileAsync(constants.google.tokens);
    }).then((content) => {
        const auth = new googleAuth();
        let oauth2Client = new auth.OAuth2(creds.installed.client_id,
                               creds.installed.client_secret,
                               creds.installed.redirect_uris[0]);
        oauth2Client.credentials = JSON.parse(content);

        return oauth2Client;
    });
}

function getEvents() {
    getAuthInfo().then((authInfo) => {
        calendarListConfiguration.auth = authInfo;
        calendarListConfiguration.timeMin = (new Date()).toISOString();

        let calendar = googleapis.calendar('v3');
        calendar.events.list(calendarListConfiguration, (err, response) => {
        //calendar.calendarList.list({auth: authInfo}, (err, response) => {
            if (err) {
                console.log('events errors');
                console.log(err);
                return;
            }

            console.log(JSON.stringify(response));
        });
    }).catch((err) => {
        console.log('auth error');
        console.log(err);
    });
}

getEvents();

module.exports = {
    getEvents
};
