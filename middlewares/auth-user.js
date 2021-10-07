const jwt = require('../bin/jwt');
const session_cache = require('../bin/session_cache');

module.exports = async (req, res, next) => {
    const { authorization } = req.headers;
    if (authorization) {
        var token = authorization.split(' ');
        if (token.length == 2 && token[0] == 'Bearer') {
            const decoded = jwt.decode(token[1]);
            req.user_data = await session_cache.get('session_' + decoded.id);
            return next();
        }
    }
    return res.status(401).send('Unauthorized!');
}