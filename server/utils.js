const jwt = require('jsonwebtoken');

const util = {
    generateToken(user) {
        let userInfo = {
            name: user.name,
            id: user.id
        };
        return token = jwt.sign(userInfo, process.env.JWT_SECRET, {
            expiresIn: 60*60*24 //24h
        });
    },
}

module.exports = util;
