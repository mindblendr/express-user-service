const router = require('express').Router();
const { Login, Player } = require('../db/models');

router.get('/', async (req, res) => {
    return res.send({
        data: await Login.findAll(),
        status: 1
    });
    try {
        return res.send({
            data: await Login.findAll({
                include: Profile
            }),
            status: 1
        });
    } catch (error) {
        return res.send({
            data: error,
            status: 0
        });
    }
});

module.exports = {
    router,
    prefix: '/test',
    middlewares: ['auth-player']
}