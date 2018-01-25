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
    let secret = 'eqwtreuytpoibv4bv65cfds312rwe465f12x3w4er5ffds123rw4e56fsd213r4we65';
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