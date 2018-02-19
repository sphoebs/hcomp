var jwt = require("json-web-token");
const users = require("../models").users;

const facebookType = "facebook";

const googleType = "google";

const url_images =
  "https://s3.eu-central-1.amazonaws.com/socialhumancomputationproject/";
const tasksName = "tasks";
const runsName = "runs";
const Encode = payload => {
  const secret = process.env.secretHSC;
  // encode
  const hash = jwt.encode(secret, payload, (err, token) => {
    if (err) {
      console.error(err.name, err.message);
    } else {
      return token;
    }
  });
  return hash;
};

const Decode = token => {
  const secret = process.env.secretHSC;
  const dehash = jwt.decode(
    secret,
    token,
    (err, decodedPayload, decodedHeader) => {
      if (err) {
        console.log(err);
        return null;
      } else {
        return decodedPayload;
      }
    }
  );
  return dehash;
};

/*DECODE THE JWT INSIDE HEADERS AUTHORIZATION AND CHECK IF ID IS IN DATABASE
 IF GO NEXT ELSE ERROR
 */

const ensureAuthorization = (req, res, next) => {
  console.log(req.headers.authorization);
  let decodedJWT = Decode(req.headers.authorization);
  if (decodedJWT) {
    console.log(decodedJWT);
    users
      .findById(decodedJWT.id)
      .then(user => {
        if (!user) {
          res.status(404).send("unAuthorized Area");
        } else {
          return next();
        }
      })
      .catch(error => res.status(400).send(error));
  } else {
    res.status(404).send("unAuthorized Area");
  }
};
/*DECODE THE JWT INSIDE HEADERS AUTHORIZATION AND CHECK IF ID IS IN DATABASE AND IF IS CREATOR
  IF GO NEXT ELSE ERROR
  */
const ensureAuthorizationCreator = (req, res, next) => {
  let decodedJWT = Decode(req.headers.authorization);
  if (decodedJWT) {
    users
      .findOne({ where: { id: decodedJWT.id, creator: true } })
      .then(user => {
        if (!user) {
          console.log("non trova utente");
          res.status(404).send("unAuthorized Area");
        } else {
          return next();
        }
      })
      .catch(error => res.status(400).send(error));
  } else {
    console.log("Non trova il jwt");
    res.status(404).send("unAuthorized Area");
  }
};

const createData = (image, name) => {
  let data = {
    Key: name,
    Body: image,
    ContentEncoding: "base64",
    ContentType: "image/*",
    ACL: "public-read"
  };
  return data;
};

module.exports = {
  Encode,
  Decode,
  ensureAuthorization,
  ensureAuthorizationCreator,
  facebookType,
  googleType,
  url_images,
  createData,
  runsName,
  tasksName
};
