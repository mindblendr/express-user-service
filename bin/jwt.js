const jwt = require("jsonwebtoken");
const jwt_config = require('../config/jwt');

module.exports = {
    encode: (payload, exp) => {
        return jwt.sign(payload, jwt_config.secret, { expiresIn: exp, algorithm: jwt_config.algo });
    },
    decode: (token) => {
        return jwt.decode(token);
    }
}