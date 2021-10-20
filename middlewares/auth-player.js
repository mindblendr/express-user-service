const jwt = require('../bin/jwt');
const session_cache = require('../bin/session_cache');

module.exports = async (req, res, next) => {
    try {
        const { authorization } = req.headers;
        if (authorization) {
            var token = authorization.split(' ');
            if (token.length == 2 && token[0] == 'Bearer') {
                const login = jwt.decode(token[1]);
                if (login.user_type == 'player') {
                    req.user_data = await session_cache.get('session_' + login.id);
                    if (req.user_data) {
                        return next();
                    }
                }
            }
        }
    } catch (error) {
        return res.status(401).send('Unauthorized!');
    }
    return res.status(401).send('Unauthorized!');
}