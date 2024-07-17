const chatController = require("../controllers/chatController");

const setupChatRoutes = (io) => {
  io.on("connect", (socket) => {
    console.log(socket.id);

    socket.on("joinconvo", (data) => {
      chatController.joinConversation(socket, data);
    });

    socket.on("sendmsg", (data) => {
      chatController.sendMessage(io, socket, data);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
};

module.exports = {
  setupChatRoutes,
};
