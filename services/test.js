const router = require('express').Router();

router.get('/', async (req, res) => {
    res.send({
        status: 1
    });
});

module.exports = {
    router,
    prefix: '/test',
    middlewares: ['auth-user']
}