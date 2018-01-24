var jwt = require('json-web-token');
const users = require('../models').users;
const secret = 'eqwtreuytpoibv4bv65cfds312rwe465f12x3w4er5ffds123rw4e56fsd213r4we65';

const Encode = payload => {        
 
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
  
    const dehash = jwt.decode(secret, token, function (err, decodedPayload, decodedHeader) {
        if (err) {
            return null;
            
        } else {            
           return decodedPayload;
        }
    });
    return dehash;
}

const ensureAuthenticated = (req,res,next) => {
    if(req.headers.authorization){
      let decodedJWT = DecodeOfAuth(req.headers.authorization.jwt);
      users
      .findOne(decodedJWT)
      .then(user => {
        if(!user){
          res.send("unAuthorized Area, Che minchia fai");
        }
        else {
          return next();
        }
      })
      .catch(error => res.status(400).send(error));      
    }
    else {
      res.send("unAuthorized Area, Che minchia fai");
    }
  }


module.exports = {Encode,Decode};