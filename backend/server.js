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
const prisma = require("./prisma/index.js");

const wishlistRoutes = require("./routes/wishlistRoutes");

app.use(express.json());
app.use(cors());

app.use(authRoutes);
app.use(clientRoutes);
app.use(workerRoutes);
app.use(productRoutes);
app.use(orderRoutes);
app.use(authAdminRoutes);
app.use(chatRoutes);
app.use(wishlistRoutes);

io.on("connect", (socket) => {
  console.log("socket connected", socket.id);
  socket.on("joinconvo", async ({ clientId, workerId }) => {
    console.log(clientId, workerId);
    try {
      let existid;
      const existconvo = await prisma.conversation.findFirst({
        where: {
          OR: [
            {
              Messages: {
                some: {
                  clientId: workerId,
                  workerId: clientId,
                },
              },
            },
            {
              Messages: {
                some: {
                  clientId: clientId,
                  workerId: workerId,
                },
              },
            },
          ],
        },
      });
      console.log("exist conco", existconvo);
      if (existconvo) {
        existid = existconvo.id;
      } else {
        const newconvo = await prisma.conversation.create({
          data: {
            title: "new conversation",
            clientId: clientId,
            workerId: workerId,
          },
        });

        existid = newconvo.id;
      }

      socket.join(existid.toString());
      socket.emit("conversationId", existid.toString());
    } catch (error) {
      console.log(error);
    }
  });
  socket.on("oldmsgs", async ({ conversationid }) => {
    console.log(conversationid);
    try {
      const messages = await prisma.message.findMany({
        where: {
          conversationId: parseInt(conversationid),
        },
      });
      socket.emit("messages", messages);
    } catch (error) {
      console.log(error);
    }
  });

  socket.on(
    "sendmsg",
    async ({ workerId, clientId, content, conversationid, sender }) => {
      console.log(workerId, clientId, content, conversationid, sender);
      try {
        const message = await prisma.message.create({
          data: {
            content: content,
            clientId: clientId,
            workerId: workerId,
            conversationId: Number(conversationid),
            sender: sender,
          },
          include: {
            Client: true,
            Worker: true,
            Conversation: true,
          },
        });
        io.emit("messagecoming", message);
        console.log(message);
      } catch (error) {
        console.log(error);
      }
    }
  );

  socket.on("getconvos", async ({ clientId }) => {
    try {
      const messages = await prisma.message.findMany({
        where: {
          OR: [
            { clientId: parseInt(clientId) },
            { workerId: parseInt(clientId) },
          ],
        },
        include: {
          Worker: true,
          Conversation: true,
        },
      });

      let workers = [];

      messages.forEach((message) => {
        const conversationId = message.conversationId;
        console.log("messag", message);
        if (
          message.Client &&
          message.Client.hasOwnProperty("idworker") &&
          !workers.some((worker) => worker.idworker === message.Client.idworker)
        ) {
          workers.push({ ...message.Client, conversationId });
        }
        if (
          message.Worker &&
          message.Worker.hasOwnProperty("idworker") &&
          !workers.some((worker) => worker.idworker === message.Worker.idworker)
        ) {
          workers.push({ ...message.Worker, conversationId });
        }
      });
      console.log(workers, "workers");
      socket.emit("convos", workers);
    } catch (error) {
      console.log(error);
    }
  });
  socket.on("disconnect", () => {
    console.log(`disonnected ${socket.id}`);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
