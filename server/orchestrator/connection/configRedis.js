const Redis = require("ioredis");
const dataRedis = new Redis({
    port: 15253,
    host: process.env.REDIS_HOST, 
    username: "default", 
    password: process.env.REDIS_PASSWORD,
});

module.exports = dataRedis;

