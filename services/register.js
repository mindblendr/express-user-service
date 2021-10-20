const router = require('express').Router();
const { Login, Admin, Player } = require('../db/models')
const bcrypt = require('bcrypt');

router.post('/register', async (req, res) => {
    try {
        let { username, password, firstname, lastname, role } = req.body;
        password = bcrypt.hashSync(password, bcrypt.genSaltSync(12));

        const login = await Login.create({
            username, password, user_type: (role && role != 'player' ? 'admin' : 'player')
        });

        if (role && role != 'player') {
            await Admin.create({
                firstname,
                lastname,
                role,
                login_id: login.id
            });
        } else {
            await Player.create({
                firstname,
                lastname,
                login_id: login.id
            });
        }

        res.send({
            data: { username, password, firstname, lastname, role },
            status: 1
        });

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