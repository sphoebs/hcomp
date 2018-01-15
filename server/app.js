// server/app.js
// libraries
const express = require('express');
const path = require('path');
const Sequelize = require ('sequelize');
const passport = require('passport');
const session = require('express-session');
const util = require('util');

//configuration
const app = express();
const utils = require('./utils.js');
require('dotenv').config();
const sequelize = new Sequelize(process.env.DATABASE_URL);
require('./passport_settings.js')(passport, sequelize);

sequelize.authenticate().then(() => {
    console.log('Connection to DB has been established successfully.');
})
.catch(err => {
    console.error('Unable to connect to the database:', err);
});
const usersTable = sequelize.import('./models/users.js');

app.use(session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 60*60*24}
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, cb) {
    cb(null, {id: user.ID, name: user.EMAIL});
});

passport.deserializeUser(function(user, cb) {
    usersTable.findById(user.id).then((user) =>{
        cb(null, user);
    });
});


app.get('/auth/login/facebook',
    passport.authenticate('facebook', { scope: ['email'] }));

app.get('/auth/login/facebook/return',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    (req, res) => {
        //console.log(req.user);
        res.redirect('/auth/succeded/'+utils.generateToken(req.user));
    }
);
app.get('/auth/login/google',
    passport.authenticate('google', { scope: ['email'] }));

app.get('/auth/login/google/return',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
        //TODO: fix redirect with react running on different server
        res.redirect('/auth/succeded/'+utils.generateToken(req.user));
    }
);

// pool.query('SELECT * FROM public.user', (err, res) => {
//     pool.end();
//     if(err) return console.error("Error: "+err);
//     //Result access through res.rows[0].ID
// });

module.exports = app;
