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

const wishlistRoutes = require('./routes/wishlistRoutes');

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
  console.log(socket.id);
  socket.on("joinconvo", async ({ clientId, workerId }) => {
    try {
      let existid 
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
                  clientId: workerId,
                  workerId: clientId,
                },
              },
            },
          ],
        },
      });
      console.log(existconvo);
      if (existconvo) {
        existid = existconvo.id;
      } else {
        const newconvo = await prisma.conversation.create({
          data: {
            title: "new conversation",
          }
        });
  
        existid = newconvo.id;
      }

      socket.join(existid.toString())
      socket.emit('conversationId', existid.toString())
    } catch (error) {
      console.log(error);
    }
  });

  socket.on("oldmsgs", async ({ conversationId }) => {
    try {
      const messages = await prisma.message.findMany({
        where: {
          conversationId: parseInt(conversationId),
        },
      });
      console.log(messages);
      socket.emit("messages", messages);
    } catch (error) {
     console.log(error)
    }
  });

  socket.on("sendmsg", async ({ workerId, clientId, content, conversationId }) => {
    console.log({workerId, clientId, content, conversationId })

    try {
      const message = await prisma.message.create({
        data: {
          content,
          clientId, 
          workerId,
          conversationId,
        },
        include: {
          Client: true,
          Worker: true,
          Conversation: true,
        },
      });

      console.log(message);

      io.to(conversationId).emit("message", message);
    } catch (error) {
      console.log(error);
    }
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});



app.get('/conversations/:clientId', async (req, res) => {
  const { clientId } = req.params; 

  try {
    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { clientId: parseInt(clientId) },
          { workerId: parseInt(clientId) }   
        ]
      },
      include: {
        Worker: true,    
        Conversation: true  
      }
    });
    

      res.send(messages);

  } catch (error) {
   console.log(error);
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);