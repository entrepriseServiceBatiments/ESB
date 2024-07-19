const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createMessage = async (req, res) => {
  const { workerId, clientId } = req.body;
  let result = [];

  try {
    if (workerId) {
      const workerConv = await prisma.message.findMany({
        where: { workerId: parseInt(workerId) },
      });
      let arr = workerConv.map((conv) => conv.clientId);
      let arrunique = Array.from(new Set(arr));

      for (let i = 0; i < arrunique.length; i++) {
        const client = await prisma.client.findUnique({
          where: { idClient: parseInt(arrunique[i]) },
        });
        const messages = await prisma.message.findMany({
          where: {
            workerId: parseInt(workerId),
            clientId: parseInt(arrunique[i]),
          },
          orderBy: { createdAt: "asc" },
        });
        result.push({ client, messages });
      }
    } else {
      const clientConv = await prisma.message.findMany({
        where: { clientId: parseInt(clientId) },
      });
      let arr = clientConv.map((conv) => conv.workerId);
      let arrunique = Array.from(new Set(arr));

      for (let i = 0; i < arrunique.length; i++) {
        const worker = await prisma.worker.findUnique({
          where: { idworker: parseInt(arrunique[i]) },
        });
        const messages = await prisma.message.findMany({
          where: {
            clientId: parseInt(clientId),
            workerId: parseInt(arrunique[i]),
          },
          orderBy: { createdAt: "asc" },
        });
        result.push({ worker, messages });
      }
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createMessage };
