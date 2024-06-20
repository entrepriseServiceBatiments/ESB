const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getWorkers = async () => {
  return await prisma.worker.findMany({
    include: { Order: true, Messages: true },
  });
};

const createWorker = async (data) => {
  return await prisma.worker.create({ data });
};

module.exports = {
  getWorkers,
  createWorker,
};
