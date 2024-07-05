const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const joinConversation = async (socket, data) => {
  try {
    let convoid = data.conversationId;
    if (!convoid) {
      const newconvo = await prisma.conversation.create({
        data: {
          title: "new conversation",
        },
      });
      convoid = newconvo.id;
    }
    socket.join(convoid.toString());
    console.log("User joined the conversation");
  } catch (error) {
    console.log(error);
  }
};

const sendMessage = async (io, socket, data) => {
  try {
    let existid = data.conversationId;

    if (!data.conversationId) {
      const existconvo = await prisma.conversation.findFirst({
        where: {
          OR: [
            {
              Messages: {
                some: {
                  AND: [
                    { senderId: data.senderId },
                    { recipientId: data.recipientId },
                  ],
                },
              },
            },
            {
              Messages: {
                some: {
                  AND: [
                    { senderId: data.recipientId },
                    { recipientId: data.senderId },
                  ],
                },
              },
            },
          ],
        },
      });

      if (existconvo) {
        existid = existconvo.id;
      } else {
        const newconvo = await prisma.conversation.create({
          data: {
            title: "new conversation",
          },
        });
        existid = newconvo.id;
      }
    }

    const message = await prisma.message.create({
      data: {
        content: data.content,
        senderId: data.senderId,
        recipientId: data.recipientId,
        conversationId: existid,
      },
      include: {
        Sender: true,
        Recipient: true,
        Conversation: true,
      },
    });
    io.to(existid.toString()).emit("message", message);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  joinConversation,
  sendMessage,
};
