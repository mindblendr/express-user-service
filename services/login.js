const router = require('express').Router();
const jwt = require('../bin/jwt');
const session_cache = require('../bin/session_cache');
const { Login,Admin } = require('../db/models')
const bcrypt = require('bcrypt');

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        let login = await Login.findOne({
            where: { username }
        });

        if (login && bcrypt.compareSync(password, login.password)) {
            const { id, username, status, user_type } = login;
            let role;
            if (user_type == 'admin') {
                role = (await Admin.findOne({
                    where: {
                        login_id: id
                    },
                    attributes: ['role']
                })).role;
            } else {
                role = 'player';
            }

            const login_data = { id, username, status, user_type, role };

            await session_cache.set('session_' + id, login_data);
            const token = jwt.encode(login_data);
            return res.send({
                data: { token },
                status: 1
            });
        }
    } catch (error) {
        console.log(error);
    }

    return res.status(401).send({ status: 0 });
});

module.exports = {
    router,
    prefix: '/',
    middlewares: null
}