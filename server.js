const socket = require("socket.io")(4010);

const users = {};

socket.on("connection", (io) => {
  io.on("new-user", (name) => {
    users[io.id] = name;
    io.broadcast.emit("user-connected", name);
  });
  io.on("send-chat-message", (message) => {
    io.broadcast.emit("chat-message", {
      message: message,
      name: users[io.id],
    });
  });
  io.on("disconnect", () => {
    io.broadcast.emit("user-disconnected", users[io.id]);
    delete users[io.id];
  });
});
