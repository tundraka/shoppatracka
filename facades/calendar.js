'use strict';

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const clientSecret = require(process.env.google);

passport.use(new GoogleStrategy({
    clientID: clientSecret.web.client_id,
    clientSecret: clientSecret.web.client_secret,
    callbackURL: 'http://tundraka.com',
    scope: ['https://www.googleapis.com/auth/calendar']
}, (accessToken, refreshToken, profile, done) => {
    console.log(JSON.stringify(accessToken));
    console.log(JSON.stringify(refreshToken));
    console.log(JSON.stringify(profile));

    return done(null, null);
}));

passport.authenticate('google');
