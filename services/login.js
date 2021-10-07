const router = require('express').Router();
const jwt = require('../bin/jwt');
const session_cache = require('../bin/session_cache');

router.get('/login', async (req, res) => {
    const user_data = {
        id: 1,
        username: 'test1',
        status: 1,
        user_type: 'user'
    };

    await session_cache.set('session_' + user_data.id, user_data, parseInt(process.env.SESSION_EXP));
    res.send(jwt.encode(user_data, parseInt(process.env.SESSION_EXP)));
    // res.send(req.user_data);
});

module.exports = {
    router,
    prefix: '/user',
    middlewares: ['auth-user']
}