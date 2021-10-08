const router = require('express').Router();
const jwt = require('../bin/jwt');
const session_cache = require('../bin/session_cache');

router.post('/login', async (req, res) => {
    const user_data = {
        id: 1,
        username: 'test1',
        status: 1,
        user_type: 'user'
    };

    await session_cache.set('sessions', user_data, parseInt(process.env.SESSION_EXP));
    const token = jwt.encode(user_data);
    res.send({
        data: { token },
        status: 1
    });
});

module.exports = {
    router,
    prefix: '/user',
    middlewares: null
}