var jwt = require('json-web-token');
const users = require('../models').users;


const Encode = payload => {
    const secret = 'weqsdacxzdsaewqdsacxzdsaewqdsa';
    // encode 
    const hash = jwt.encode(secret, payload, function (err, token) {
        if (err) {
            console.error(err.name, err.message);
        } else {
            return token;
        }
    });
    return hash;
}

const Decode = token => {   
    const secret = 'weqsdacxzdsaewqdsacxzdsaewqdsa';
    const dehash = jwt.decode(secret, token, function (err, decodedPayload, decodedHeader) {
        if (err) {
            return null;

        } else {
            return decodedPayload;
        }
    });
    return dehash;
}

 /*DECODE THE JWT INSIDE HEADERS AUTHORIZATION AND CHECK IF ID IS IN DATABASE
  IF GO NEXT ELSE ERROR
  */ 

const ensureAuthorization = (req, res, next) => {
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
/*DECODE THE JWT INSIDE HEADERS AUTHORIZATION AND CHECK IF ID IS IN DATABASE AND IF IS CREATOR
  IF GO NEXT ELSE ERROR
  */ 
const ensureAuthorizationCreator = (req, res, next) => {
    if (req.headers.authorization) {
        let decodedJWT = Decode(req.headers.authorization);
        users
            .findOne({where : {id: decodedJWT.id, creator: true}})
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


module.exports = { Encode, Decode, ensureAuthorization, ensureAuthorizationCreator };