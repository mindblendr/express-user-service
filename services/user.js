const router = require('express').Router();
const { Player, Admin } = require('../db/models/');

router.get('/me', async (req, res) => {
    let profile;
    try {
        switch (req.user_data.user_type) {
            case 'player':
                profile = await Player.findOne({ where: { login_id: req.user_data.id } });
                break;
            case 'admin':
                profile = await Admin.findOne({ where: { login_id: req.user_data.id } });
                break;
            default:
                break;
        }

        return res.send({
            data: profile,
            status: profile ? 1 : 0
        });
    } catch (error) {
        console.log(error);
    }

    return res.status(401).send({ status: 0 });
});

module.exports = {
    router,
    prefix: '/user',
    middlewares: ['auth-all']
}