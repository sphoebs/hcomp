const Crud = require("./Crud");
const users = require("../models").users;
const app = require("../../app").app;
const { Encode, facebookType, googleType } = require("../Utility/Utility");

const creator = "creator";

class Users extends Crud {
  constructor() {
    super(users);
    this.lastUpdated;
  }

  //controllare con access token
  findOrCreate(req, res) {
    let data = req.body.data;
    let type = req.body.type;
    let isWriter = req.body.isWriter;
    switch (type) {
      case facebookType:
        return this.model
          .findOne({
            where: {
              social_id: data.id
            }
          })
          .then(user => {
            let tmp;
            if (!user) {
              return this.model
                .create({
                  social_id: data.id,
                  email: data.email,
                  name: data.name,
                  img: data.picture.data.url,
                  accessToken: data.accessToken,
                  creator: isWriter,
                  access_type: facebookType
                })
                .then(user => {
                  let tmp;
                  if (!user) {
                    tmp = res
                      .status(400)
                      .send({ message: "Something goes wrong!" });
                  } else {
                    let payload = {
                      id: user.id
                    };
                    let hash = Encode(payload);
                    let sendResponse = this.createPayload(user.id, hash);
                    tmp = res.status(200).send(JSON.stringify(sendResponse));
                  }
                  return tmp;
                })
                .catch(error => res.status(400).send(error));
            } else {
              user
                .update({
                  accessToken: data.accessToken,
                  creator: isWriter
                })
                .then(user => {
                  let payload = {
                    id: user.id
                  };
                  let hash = Encode(payload);
                  let sendResponse = this.createPayload(user.id, hash);
                  tmp = res.status(200).send(JSON.stringify(sendResponse));
                })
                .catch(error => res.status(400).send(error));
            }
            return tmp;
          })
          .catch(error => res.status(400).send(error));
        break;
      case googleType:
        return this.model
          .findOne({
            where: {
              social_id: data.profileObj.googleId
            }
          })
          .then(user => {
            let tmp;
            if (!user) {
              return this.model
                .create({
                  social_id: data.profileObj.googleId,
                  email: data.profileObj.email,
                  img: data.profileObj.imageUrl,
                  name: data.profileObj.name,
                  accessToken: data.accessToken,
                  creator: isWriter,
                  access_type: googleType
                })
                .then(user => {
                  let tmp;
                  if (!user) {
                    tmp = res
                      .status(400)
                      .send({ message: "Something goes wrong!" });
                  } else {
                    let payload = {
                      id: user.id
                    };
                    let hash = Encode(payload);
                    let sendResponse = this.createPayload(user.id, hash);
                    tmp = res.status(200).send(JSON.stringify(sendResponse));
                  }
                  return tmp;
                })
                .catch(error => res.status(400).send(error));
            } else {
              user
                .update({
                  accessToken: data.accessToken,
                  creator: isWriter
                })
                .then(user => {
                  let payload = {
                    id: user.id
                  };
                  let hash = Encode(payload);
                  let sendResponse = this.createPayload(user.id, hash);
                  tmp = res.status(200).send(JSON.stringify(sendResponse));
                })
                .catch(error => res.status(400).send(error));
            }
            return tmp;
          })
          .catch(error => res.status(400).send(error));
        break;
      default:
        break;
    }
  }

  readAll(req, res) {
    let query = req.query;
    if (query.filter && query.parameter) {
      switch (query.filter) {
        case creator:
          return this.model
            .findAll({
              where: { creator: query.parameter },
              attributes: ["id", "name", "img"]
            })
            .then(users => res.status(200).send(users))
            .catch(error => res.status(400).send(error));
          break;
        default:
          break;
      }
    } else {
      return res.status(400).send({ message: "Something goeas wrong" });
    }
  }

  readOne(req, res) {
    return this.model
      .findById(req.params.id, {
        attributes: ["name", "img", "email", "createdAt"]
      })
      .then(user => {
        let tmp;
        if (!user) {
          tmp = res.status(404).send({ message: "Data not found!" });
        } else {
          tmp = res.status(200).send(user);
        }
        return tmp;
      })
      .catch(error => res.status(400).send(error));
  }

  createPayload(id, jwt) {
    let payload = {
      id: id,
      jwt: jwt
    };
    return payload;
  }
}

module.exports = Users;

//FACEBOOK API CALL FOR TAKING FRIEND THAT USE OUT APP

/*
  FB.api('/me/friends', (response) => {
      if(response.data) {
         console.log(response.data)
      } else {
          alert("Error!");
      }
  });
  */

//POSSIBLE IMPLEMENTATION FOR HAVING USER FRIENDS ON GOOGLE

/*oauth2Client.setCredentials({
  access_token: req.body.data.accessToken
});
plus.people.get({
  userId: 'me/friends',
  personFields: 'emailAddresses,names',
  auth: oauth2Client
}, (err, response) => {
  if (req.body.data.profileObj.googleId === response.data.id && req.body.data.profileObj.name === response.data.displayName) {
    return next();
  }
  else {
    res.status(404).send("unAuthorized Area");
  }
});*/
