// server/app.js
const express = require('express');
const path = require('path');
const {Pool} = require('pg');
const passport = require('passport');
const Strategy = require('passport-facebook').Strategy;
const app = express();

require('dotenv').config();

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

const pool = new Pool({
    connectionString:process.env.DATABASE_URL,
    ssl : {
        rejectUnauthorized : false,
    }
});

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));

passport.use(new Strategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "https://hsoc.herokuapp.com/auth/login/facebook/return"
    },
    function(accessToken, refreshToken, profile, cb) {
        console.log("dentro function della strategy");
        return cb(err, user);
    }
));

app.use(passport.initialize());
app.use(passport.session());

// Always return the main index.html, so react-router render the route in the client

app.get('auth/login/facebook',
    passport.authenticate('facebook'));

app.get('auth/login/facebook/return',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    function(req, res) {
        res.redirect('/');
    }
);

app.get('*', (req, res) => {
    if(req.url != 'auth/login/facebook')
        passport.authenticate('facebook');
    if(req.url != 'auth/login/facebook/return') {
        passport.authenticate('facebook', { failureRedirect: '/login' }),
        function(req, res) {
            res.redirect('/');
        }
    }
    res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

app.post('/userLogin', (req, res)=>{
    console.log("Login request received");
    res.send("Login request received");
})

// pool.query('SELECT * FROM public.user', (err, res) => {
//     pool.end();
//     if(err) return console.error("Error: "+err);
//     //Result access through res.rows[0].ID
// });

module.exports = app;
