const controller = require("../controllers").users;
const { Decode , ensureAuth1} = require('../Security/SourceOfAuth');
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

  /*DECPDE THE JWT INSIDE HEADERS AUTHORIZATION AND CHECK IF ID IS IN DATABASE
  IF GO NEXT ELSE ERROR
  */ 
  const ensureAuthenticated = (req, res, next) => {
    if (req.headers.authorization) {
      let decodedJWT = Decode(req.headers.authorization);
      users
        .findById(decodedJWT.id)
        .then(user => {
          if (!user) {
            res.status(404).send("unAuthorized Area");
          }
          else {
            return next();
          }
        })
        .catch(error => res.status(400).send(error));
    }
    else {
      res.status(404).send("unAuthorized Area");
    }
  }

  /*
  CHECK IF THE RECEIVED ACCESS TOKEN CORRESPONDS TO THE USER THROUGH A CALL TO FACEBOOK API AND GOOGLE API
  */
  const findUserAuth = (req, res, next) => {
    if (req.body.type === facebookType) {
      FB.api('me', { fields: 'id,name', access_token: req.body.data.accessToken }, (response) => {
        if (req.body.data.id === response.id && req.body.data.name === response.name) {
          return next();
        }
        else {
          res.status(404).send("unAuthorized Area");
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
        if (req.body.data.profileObj.googleId === response.data.id && req.body.data.profileObj.name === response.data.displayName) {
          return next();
        }
        else {
          res.status(404).send("unAuthorized Area");
        }
      });

    }

  }
  

  app.post('/auth/login', findUserAuth, (req, res) => {
    controller.create(req, res);
  })
  app.get('/users', ensureAuthenticated, (req, res) => {
    controller.readAll(req, res);
  })
  app.get('/users/:id', ensureAuth1, (req, res) => {
    controller.readOne(req, res);
  });
};
