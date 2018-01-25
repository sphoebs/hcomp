const controller = require("../controllers").users;
const {Decode} = require('./SourceOfAuth');
const users = require('../models').users;
module.exports = app => {

  const ensureAuthenticated = (req,res,next) => {
    if(req.headers.authorization){
      console.log("Stampa auth");
      console.log(req.headers.authorization);
      let decodedJWT = Decode(req.headers.authorization);
      console.log(decodedJWT);
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
      console.log("Stampa auth se non c'è");
      console.log(req.headers.authorization);
      res.status(404).send("unAuthorized Area, Che minchia fai");
    }
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

   app.post('/auth/login' , (req,res) => {
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
