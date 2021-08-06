

const server   = require("http");
const io       = require("socket.io")(server);

module.exports.io= io
module.exports.server= server