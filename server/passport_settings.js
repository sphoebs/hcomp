const Strategy = require('passport-facebook').Strategy;

module.exports = (passport) => {
    passport.serializeUser(function(user, cb) {
        cb(null, user);
    });

    passport.deserializeUser(function(obj, cb) {
        cb(null, obj);
    });

    passport.use(new Strategy({
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: "https://hsoc.herokuapp.com/auth/login/facebook/return",
        profileFields: ['id', 'displayName', 'photos', 'email']
    },
    (accessToken, refreshToken, profile, cb) => {
        usersTable
        .findOrCreate({where: {facebookID: profile.user_id}})
        .spread((user, created) => {
            console.log(user.get({
                plain: true
            }));
            console.log(created);
            return cb(null, profile);
        })
    }
));
};
