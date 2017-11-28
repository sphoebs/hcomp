const Strategy = require('passport-facebook').Strategy;
const util = require('util');

module.exports = (passport, sequelize) => {

    const usersTable = sequelize.import('./models/users.js');

    passport.use(new Strategy({
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: "https://hsoc.herokuapp.com/auth/login/facebook/return",
        profileFields: ['id', 'displayName', 'photos', 'email'],
        enableProof: true
    },
    (accessToken, refreshToken, profile, cb) => {
        console.log("PROFILE: ")
        console.log(util.inspect(profile, false, null));
        usersTable
        .findOrCreate({where: {FACEBOOK_ID: profile.id, EMAIL: profile.email}})
        .spread((user, created) => {
            // console.log(user.get({
            //     plain: true
            // }));
            // console.log(created);
            return cb(null, user);
        })
    }
));
};
