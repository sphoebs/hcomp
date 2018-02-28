var jwt = require("json-web-token");

const tasks = require("../models").tasks;
const runs = require("../models").runs;
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
  let decodedJWT = Decode(req.headers.authorization);
  if (decodedJWT) {
    return next();
  } else {
    res.status(404).send("unAuthorized Area");
  }
};
/*DECODE THE JWT INSIDE HEADERS AUTHORIZATION AND CHECK IF ID IS IN DATABASE AND IF IS CREATOR
  IF GO NEXT ELSE ERROR
  */
const ensureAuthorizationCreator = (req, res, next) => {
  let decodedJWT = Decode(req.headers.authorization);
  if (decodedJWT.creator) {
    return next();
  } else {
    res.status(404).send("unAuthorized Area");
  }
};

const ensureAuthorizationCreatorOrCollaboratorOfTask = (req, res, next) => {
  let decodedJWT = Decode(req.headers.authorization);
  if (decodedJWT.creator) {
    tasks.findById(req.params.id).then(task => {
      if (task.collaborators.indexOf(decodedJWT.creator)) {
        return next();
      } else {
        res.status(404).send("unAuthorized Area");
      }
    })
    .catch(error => res.status(400).send(error));
  } else {
    res.status(404).send("unAuthorized Area");
  }
};

const ensureAuthorizationCreatorOrCollaboratorOfRun = (req, res, next) => {
  let decodedJWT = Decode(req.headers.authorization);
  if (decodedJWT.creator) {
    runs.findById(req.params.id).then(run => {
      tasks.findById(run.id_task).then(task => {
        if (task.collaborators.indexOf(decodedJWT.creator)) {
          return next();
        } else {
          res.status(404).send("unAuthorized Area");
        }
      }).catch(error => res.status(400).send(error));
    }).catch(error => res.status(400).send(error));
  } else {
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
  ensureAuthorizationCreatorOrCollaboratorOfRun,
  ensureAuthorizationCreatorOrCollaboratorOfTask,
  facebookType,
  googleType,
  url_images,
  createData,
  runsName,
  tasksName
};
