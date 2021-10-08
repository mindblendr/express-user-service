const jwt = require("jsonwebtoken");
const jwt_config = require('../config/jwt.json')

module.exports = {
    encode: (payload) => {
        return jwt.sign(payload, jwt_config.secret, { expiresIn: jwt_config.ttl, algorithm: jwt_config.algo });
    },
    decode: (token) => {
        return jwt.decode(token);
    }
}