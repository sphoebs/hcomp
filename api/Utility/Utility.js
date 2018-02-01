var jwt = require('json-web-token');
const users = require('../models').users;

const facebookType = 'facebook';

const googleType = 'google';

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
}

const Decode = token => {
    const secret = process.env.secretHSC;
    const dehash = jwt.decode(secret, token, (err, decodedPayload, decodedHeader) => {
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
            .findOne({ where: { id: decodedJWT.id, creator: true } })
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

const readQuery = (elementSearched, url) => {     
    elementSearched = elementSearched.replace(/[\[\]]/g, "\\$&");
    let regex = new RegExp("[?&]" + elementSearched + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);    
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

//CHECK IF THERE IS ONLY ONE TRUE
const securityControl = (id_task,id_runtype,id_run) => {
    let arrayOfBooleans = [id_task,id_run,id_runtype];
    if(id_task && id_runtype && id_run){
        for(let i = 0; i<arrayOfBooleans.length; i++){
            if(!arrayOfBooleans[i]){
                return true;
            }
        }
        return false;
    }
    else {
        return false;
    }
}

module.exports = {
    Encode,
    Decode,
    ensureAuthorization,
    ensureAuthorizationCreator,
    readQuery,
    securityControl,
    facebookType,
    googleType
};