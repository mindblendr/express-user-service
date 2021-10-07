/**
 * Usage:
 * `this.emit(event, message)`
 */
const { Emitter } = require("@socket.io/redis-emitter");
const { createClient } = require("redis");
const redisClient = createClient(process.env.REDIS_PUBSUB_URL);
module.exports = new Emitter(redisClient);