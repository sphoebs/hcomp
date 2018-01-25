const controller = require("../controllers").users;
const {Decode} = require('./SourceOfAuth');
const users = require('../models').users;
const {FB, FacebookApiException} = require('fb');
module.exports = app => {

  const ensureAuthenticated = (req,res,next) => {
    if(req.headers.authorization){      
      let decodedJWT = Decode(req.headers.authorization);     
      users
      .findById(decodedJWT.id)
      .then(user => {
        if(!user){
          res.status(404).send("unAuthorized Area, Che minchia fai");
        }
        else {
          return next();
        }
      })
      .catch(error => res.status(400).send(error));      
    }
    else {      
      res.status(404).send("unAuthorized Area, Che minchia fai");
    }
  }

  const findUserAuth = (req,res,next) => {
    const lol = FB.api('me', { fields: 'id,name', access_token: req.body.data.accessToken },  (res) => {
     if(req.body.data.id === res.id && req.body.data.name === res.name){
      return 'ciao';
     }
     else {
      return 'ops';
     }
    });
    console.log(lol);
     
  }
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

   app.post('/auth/login', findUserAuth , (req,res) => {
     controller.create(req,res);
   })
   app.get('/users', (req,res) => {
     controller.readAll(req,res);
   })
   app.get('/users/:id',  ensureAuthenticated, (req,res) => {
     controller.readOne(req,res);
   });

 /*  app.get('/get_fb_profile', function(req, res) {
    oauth2.get(&quot ;https://graph.facebook.com/me&quot;, req.session.accessToken, function(err, data ,response) {
     if (err) {
      console.error(err);
      res.send(err);
     } else {
      var profile = JSON.parse(data);
      console.log(profile);
      var profile_img_url = "https://graph.facebook.com/"+profile.id+"/picture";
     }
    });
   });*/
};
