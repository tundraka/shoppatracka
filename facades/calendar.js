'use strict';

const constants = require('../utils/constants');
const clientToken = require(constants.google.tokens);
const secret = require(constats.google.tokens);
const oauth2Client = new auth.OAuth2(secret.installed.clientId,
                                     secret.installed.clientSecret,
                                     secret.installed.redirectUrl);
const GoogleStrategy = require('passport-google-oauth20').Strategy;

function getToken() {
}

passport.authenticate('google');
