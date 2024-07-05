const express = require("express");
const router = express.Router();
const { setupChatRoutes } = require("../services/chatService");
const socket_io = require("socket.io");

const app = express();
const http = require("http");
const server = http.createServer(app);
const io = socket_io(server);

setupChatRoutes(io);

module.exports = router;
