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
    let tmp = '';
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

const ensureAuth1 = (req, res, next) => {
    if (req.headers.authorization) {
        let decodedJWT = this.Decode(req.headers.authorization);
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



module.exports = { Encode, Decode, ensureAuth1 };