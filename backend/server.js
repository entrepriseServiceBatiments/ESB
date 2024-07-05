
require("dotenv").config();


const express = require("express");
const cors = require("cors");

const app = express();
const http = require("http");
const server = http.createServer(app);
const socket_io = require("socket.io");
const io = socket_io(server);

const clientRoutes = require("./routes/clientRoutes");
const workerRoutes = require("./routes/workerRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const authAdminRoutes = require("./routes/authAdminRoutes");
const authRoutes = require("./routes/authRoutes");
const chatRoutes = require("./routes/chatRoutes");

app.use(express.json());
app.use(cors());

app.use(authRoutes);
app.use(clientRoutes);
app.use(workerRoutes);
app.use(productRoutes);
app.use(orderRoutes);
app.use(authAdminRoutes);
app.use(chatRoutes);

// app.get("/protected", authenticateToken, (req, res) => {
//   res.json({ message: "This is a protected route" });
// });

io.on("connect", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
