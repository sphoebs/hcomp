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

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.get('/auth/login/facebook',
    passport.authenticate('facebook', { authType: 'rerequest', scope: ['id', 'displayName', 'photos', 'email'] }));

app.get('/auth/login/facebook/return',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    (req, res) => {
        //console.log(req.user);
        res.redirect('/auth/succeded/'+utils.generateToken(req.user));
    }
);

// Always return the main index.html, so react-router render the route in the client
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

// Always return the main index.html, so react-router render the route in the client
app.get('/login', (req, res) => {
    console.log("LOGIN, REQ.USER: ");
    //console.log(util.inspect(req.user, false, null));
    if (req.user){
        res.redirect('/');
    } else {
        res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
    }

});// Always return the main index.html, so react-router render the route in the client

app.get('/about', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});


// pool.query('SELECT * FROM public.user', (err, res) => {
//     pool.end();
//     if(err) return console.error("Error: "+err);
//     //Result access through res.rows[0].ID
// });

module.exports = app;
