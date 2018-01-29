const Crud = require("./Crud");
const users = require("../models").users;
const app = require("../../app").app;
const {Encode} = require('../Security/SourceOfAuth');

const facebookType = 'facebook';
const googleType = 'google';


class Users extends Crud {
  constructor() {
    super(users);
    this.lastUpdated;
  }


  //controllare con access token
  create(req, res) {
    let data = req.body.data;
    let type = req.body.type;    
    let isWriter = req.body.isWriter;
    if (type === facebookType) {
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
                writer: isWriter,
                access_type: facebookType
              })
              .then(user => {
                let tmp;
                if (!user) {
                  tmp = res.status(400).send({ message: 'Something goes wrong!' });
                }
                else {
                  let payload = {
                    id: user.id
                  }                  
                  let hash = Encode(payload);
                  let sendResponse = this.createPayload(user.id,hash);                
                  tmp = res.status(200).send(JSON.stringify(sendResponse));
                }
                return tmp;
              })
              .catch(error => res.status(400).send(error));
          }
          else {     
            let payload = {
              id: user.id
            }            
            let hash = Encode(payload);
            let sendResponse = this.createPayload(user.id,hash);           
            tmp = res.status(200).send(JSON.stringify(sendResponse));
          }
          return tmp;
        })
        .catch(error => res.status(400).send(error));
    }
    else {
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
                writer: isWriter,
                access_type: googleType
              })
              .then(user => {
                let tmp;
                if (!user) {
                  tmp = res.status(400).send({ message: 'Something goes wrong!' });
                }
                else {
                  let payload = {
                    id: user.id
                  }                  
                  let hash = Encode(payload);
                  let sendResponse = this.createPayload(user.id,hash);
                  console.log(sendResponse);
                  tmp = res.status(200).send(JSON.stringify(sendResponse));
                }
                return tmp;
              })
              .catch(error => res.status(400).send(error));
          } else {
            let payload = {
              id: user.id
            }           
            let hash = Encode(payload);
            let sendResponse = this.createPayload(user.id,hash);
            console.log(sendResponse);
            tmp = res.status(200).send(JSON.stringify(sendResponse));
          }
          return tmp;
        })
        .catch(error => res.status(400).send(error));
    }
  }


  readAll(req, res) {
    return this.model
      .findAll({ attributes: ['name','img','email','createdAt']})
      .then(users => res.status(200).send(users))
      .catch(error => res.status(400).send(error));
  }

  readOne(req, res) {    
    return this.model
      .findById(req.params.id, { attributes: ['name','img','email','createdAt']})
      .then(user => {
        let tmp;
        if (!user) {
          tmp = res.status(400).send({ message: 'Data not found!' });
        } else {
          tmp = res.status(200).send(user);
        }
        return tmp;
      })
      .catch(error => res.status(400).send(error));
  }

  createPayload(id,jwt){
    let payload = {
      id: id,
      jwt: jwt
    }
    return payload;
  }
}


module.exports = Users;
