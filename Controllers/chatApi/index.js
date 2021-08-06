

const server   = require("http");
const io       = require("socket.io")(server);
io.adapter(redisAdapter({ host : process.env.REDIS_HOST,port : 6379}))

module.exports.io= io
module.exports.server= server