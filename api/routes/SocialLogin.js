const controller = require("../controllers").users;
const users = require("../models").users;
const passport = require('passport');
require('./passport_settings.js')(passport);

// Init
module.exports = app => {
   
    app.use(passport.initialize());
    app.use(passport.session());
    
    passport.serializeUser(function(user, cb) {
        cb(null, {id: user.ID, name: user.EMAIL});
    });
    
    passport.deserializeUser(function(user, cb) {
        /*users.findById(user.id).then((user) =>{
            cb(null, user);
        });*/
    });
     
    app.get('/auth/login/facebook',
        passport.authenticate('facebook', { scope: ['email'] }));
    
    app.get('/auth/facebook/callback', passport.authenticate('facebook', {session:false}),
        (req,res) => {
            res.redirect('http://localhost:3000/auth/complete/'+'hei');
        }
    );
   
    app.get('/auth/login/google',
        passport.authenticate('google', { scope: ['email'] }));
    
    app.get('/auth/login/google/callback',
        passport.authenticate('google',),
        (req, res) => {
            console.log(req.user);
            res.send('ok');
        }
    );
};
