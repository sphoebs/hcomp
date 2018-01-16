const controller = require("../controllers").users;
const passport = require("passport");
const sequelize = require("../models/index").sequelize;
require('./passport_settings')(passport, sequelize);

module.exports = app => {
  /**
   * @swagger
   * definitions:
   *   users:
   *      properties:
   *         id:
   *            type: string
   *         Facebook_ID:
   *            type: string
   *         Google_ID:
   *            type: string      
   *         email:
   *            type: string
   *         is_deleted:
   *            type: boolean
   *            default: false
   *         additional_data:
   *            type: object
   *         writer:
   *            type: boolean
   *            default: false
   */

  app.get("/auth/login/facebook", (req, res) => {
    controller.auth_facebook(req, res);
  });

  app.get("/auth/login/facebook/return", (req, res) => {
    controller.auth_facebook_return(req,res);
  });

  app.get("/auth/login/google", (req, res) => {
    controller.auth_google(req,res);
  });

  app.get("/auth/login/google/return", (req, res) => {
    controller.auth_google_return(req,res);
  });
  app.get("/auth/loginAsWriter/facebook", (req, res) => {
    
  });
  app.get("/auth/loginAsWriter/google", (req, res) => {
    
  });
  app.get("/auth/loginAsConsumer/facebook", (req, res) => {
    
  });
  app.get("/auth/loginAsConsumer/google", (req, res) => {
    
  });
  app.delete("/auth/logout/facebook", (req, res) => {
    
  });
  app.delete("/auth/logout/google", (req, res) => {
    
  });
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
};
