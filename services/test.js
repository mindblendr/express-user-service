const router = require('express').Router();
const { Login, Player } = require('../db/models');

router.get('/', async (req, res) => {
    try {
        return res.send({
            data: await Login.findOne({
                include: {
                    model: Player,
                    required: false
                }
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