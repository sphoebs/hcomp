var jwt = require('json-web-token');



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




module.exports = {Encode,Decode};