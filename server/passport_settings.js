const Strategy = require('passport-facebook').Strategy;

module.exports = (passport, sequelize) => {

    const usersTable = sequelize.import('./models/users.js');

    passport.serializeUser(function(user, cb) {
        console.log("SERIALIZING");
        cb(null, {id: user.ID, name: user.FACEBOOK_ID});
    });

    passport.deserializeUser(function(user, cb) {
        console.log("DESERIALIZING");
        usersTable.findById(user.id).then(user => {
            console.log("DESERIALIZED");
            cb(null, user);
        })
    });

    passport.use(new Strategy({
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: "https://hsoc.herokuapp.com/auth/login/facebook/return",
        profileFields: ['id', 'displayName', 'photos', 'email']
    },
    (accessToken, refreshToken, profile, cb) => {
        //console.log("PROFILE: ")
        //console.log(util.inspect(profile, false, null));
        usersTable
        .findOrCreate({where: {FACEBOOK_ID: profile.id}})
        .spread((user, created) => {
            console.log("INTO SPREAD");
            // console.log(user.get({
            //     plain: true
            // }));
            // console.log(created);
            return cb(null, user);
        })
    }
));
};
