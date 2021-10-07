const { createClient } = require("redis");
const { promisifyAll } = require('bluebird');
const redisClient = createClient(process.env.REDIS_CACHE_URL);

promisifyAll(redisClient);

module.exports = {
    get: async key => {
        return JSON.parse(await redisClient.getAsync(key));
    },
    set: async (key, value, exp = 0) => {
        await redisClient.setAsync(key, JSON.stringify(value));
        if (exp > 0) redisClient.expire(key, exp);
    }
}