const socket = require("socket.io")(4010);

socket.on("connection", (io) => {
  io.emit("message here", "hello world");
});
