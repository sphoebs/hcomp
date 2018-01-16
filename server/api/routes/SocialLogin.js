const controller = require("../controllers").users;
const users = require("../models").users;
const passport = require('passport');
require('./passport_settings.js')(passport);

// Init
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
     /**
     * @swagger
     * /api/v1/auth/loginAsWriter/facebook:
     *   get:
     *     tags:
     *       - Users
     *     description: Login with Facebook
     *     produces:
     *       - application/json             
     *     responses:
     *       200:
     *         description: return a Token with user informations and Edit user's writer as true
     *         schema:
     *           $ref: '#/definitions/users'
     */
    app.get('/auth/login/facebook',
        passport.authenticate('facebook', { scope: ['email'] }));
    
    app.get('/auth/facebook/callback', passport.authenticate('facebook'),
        (req, res) => {
            console.log(req.user);
            res.send('ok');
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
