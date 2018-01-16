const FBStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const users = require('../models').users;
const util = require('util');

module.exports = (passport, sequelize) => {

    /*passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_APP_ID,
        clientSecret: process.env.GOOGLE_APP_SECRET,
        callbackURL: "https://hsoc.herokuapp.com/auth/login/google/return",
        profileFields: ['profile','email'],
        enableProof: true
    },
    (accessToken, refreshToken, profile, cb) => {
        console.log("PROFILE: ");
        console.log(util.inspect(profile, false, null));
        users
        .findOrCreate({where: {GOOGLE_ID: profile.id, EMAIL: profile.emails[0].value}})
        .spread((user, created) => {
            // console.log(user.get({
            //     plain: true
            // }));
            // console.log(created);
            return cb(null, user);
        });
    }
    ));
    passport.use(new FBStrategy({
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: "https://hsoc.herokuapp.com/auth/login/facebook/return",
        profileFields: ['id', 'displayName', 'photos', 'email'],
        enableProof: true
    },
    (accessToken, refreshToken, profile, cb) => {
        console.log("PROFILE: ");
        console.log(util.inspect(profile, false, null));
        users
        .findOrCreate({where: {FACEBOOK_ID: profile.id, EMAIL: profile._json.email}})
        .spread((user, created) => {
            // console.log(user.get({
            //     plain: true
            // }));
            // console.log(created);
            return cb(null, user);
        })
    }
    ));*/
};
