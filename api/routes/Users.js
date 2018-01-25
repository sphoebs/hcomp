const controller = require("../controllers").users;
const { Decode } = require('./SourceOfAuth');
const users = require('../models').users;
const { FB, FacebookApiException } = require('fb');
const google = require('googleapis');
const plus = google.plus('v1');
const facebookType = 'facebook';
const OAuth2 = google.auth.OAuth2;
const oauth2Client = new OAuth2(
  process.env.GOOGLE_APP_ID,
  process.env.GOOGLE_APP_SECRET
);
module.exports = app => {

  const ensureAuthenticated = (req, res, next) => {
    if (req.headers.authorization) {
      let decodedJWT = Decode(req.headers.authorization);
      users
        .findById(decodedJWT.id)
        .then(user => {
          if (!user) {
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

  const findUserAuth = (req, res, next) => {
    if (req.body.type === facebookType) {
      FB.api('me', { fields: 'id,name', access_token: req.body.data.accessToken }, (response) => {
        if (req.body.data.id === response.id && req.body.data.name === response.name) {
          return next();
        }
        else {
          res.status(404).send("unAuthorized Area, Che minchia fai");
        }
      });
    }
    else {
      oauth2Client.setCredentials({
        access_token: req.body.data.accessToken
      });
      plus.people.get({
        userId: 'me',
        personFields: 'emailAddresses,names',
        auth: oauth2Client
      }, (err, response) => {
        console.log(response.data.id);
        console.log(req.body.data.profileObj.googleId);
        console.log(response.data.name);
        console.log(req.body.data.profileObj.name);
        if (req.body.data.profileObj.googleId === response.data.id && req.body.data.profileObj.name === response.data.name) {
          return next();
        }
        else {
          res.status(404).send("unAuthorized Area, Che minchia fai");
        }
      });

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

  app.post('/auth/login', findUserAuth, (req, res) => {
    controller.create(req, res);
  })
  app.get('/users', (req, res) => {
    controller.readAll(req, res);
  })
  app.get('/users/:id', ensureAuthenticated, (req, res) => {
    controller.readOne(req, res);
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
