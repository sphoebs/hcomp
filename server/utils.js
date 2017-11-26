const jwt = require('jsonwebtoken');

function generateToken(user){
    let userInfo = {
        name: user.name,
        id: user.id
    };
    return token = jwt.sign(userInfo, process.env.JWT_SECRET, {
        expiresIn: 60*60*24 //24h
    });
}
