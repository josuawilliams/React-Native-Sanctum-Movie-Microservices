const Redis = require("ioredis");
let dataRedis = new Redis({
    port: 15253,
    host: process.env.HOST_SECRET,
    username: "default", 
    password: process.env.REDIS_SECRET,
})

module.exports = dataRedis;
