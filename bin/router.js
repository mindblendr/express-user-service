const services_path = '../services/';
const middlewares_path = '../middlewares/';

const services = require('../config/routes');

module.exports = (app) => {
    services.forEach(service => {
        var {prefix, router, middlewares} = require(services_path + service);
        prefix = prefix || '/';
        if (middlewares) {
            middlewares.forEach(middleware => {
                try {
                    _middleware = require(middlewares_path + middleware);
                    if (_middleware) app.use(prefix, _middleware);
                } catch (error) {
                    console.log(error);
                }
            });
        }
        app.use(prefix, router);
    });
}