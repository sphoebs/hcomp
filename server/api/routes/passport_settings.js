const FacebookStrategy 	= require('passport-facebook').Strategy;
const GoogleStrategy 		= require('passport-google').Strategy;
const users = require('../models').users;


module.exports = (passport) => {

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
    ));*/
    passport.use(new FacebookStrategy({
        clientID: "142183423121418",
        clientSecret: "c3be417b364c3bcb40f4868683ea4c6c",
        authParameters: {
          scope: "user_posts,manage_pages"
        },
        callbackURL: "http://localhost:8000/auth/facebook/callback",
        profileFields: ['id', 'displayName', 'photos', 'email'],
        enableProof: true
    },
    (accessToken, refreshToken, profile, cb) => {        
        console.log(profile._json);        
        return cb(null,'hei');
        
    }
    ));
};
