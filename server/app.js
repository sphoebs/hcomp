// server/app.js
const express = require('express');
const path = require('path');
const {Pool} = require('pg');
const passport = require('passport');
const session = require('express-session');
const app = express();
const utils = require('./utils.js');

require('dotenv').config();

require('./passport_settings.js')(passport);

app.use(session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 60*60*24}
}));
app.use(passport.initialize());
app.use(passport.session());


const pool = new Pool({
    connectionString:process.env.DATABASE_URL,
    ssl : {
        rejectUnauthorized : false,
    }
});

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));


app.get('/auth/login/facebook',
    passport.authenticate('facebook', { authType: 'rerequest' }));

app.get('/auth/login/facebook/return',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    (req, res) => {
        console.log(res.req.user._json);
        res.redirect('/auth/succeded/'+utils.generateToken(res.req.user._json));
    }
);

// Always return the main index.html, so react-router render the route in the client
app.get('/', (req, res) => {
    console.log("/: "+req.session.passport);
    res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

// Always return the main index.html, so react-router render the route in the client
app.get('/login', (req, res) => {
    console.log("login: "+req.session);
    res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});// Always return the main index.html, so react-router render the route in the client

app.get('/about', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
    console.log("*: "+req.session);
    res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});


// pool.query('SELECT * FROM public.user', (err, res) => {
//     pool.end();
//     if(err) return console.error("Error: "+err);
//     //Result access through res.rows[0].ID
// });

module.exports = app;
