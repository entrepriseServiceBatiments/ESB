const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getWorkers = async () => {
  return await prisma.worker.findMany({
    include: { Order: true, Messages: true },
  });
};
const getWorkerByEmail = async (email) => {
  return await prisma.worker.findUnique({ where: { email } });
};
const createWorker = async (data) => {
  return await prisma.worker.create({ data });
};
const updateworker = async (workerId, data) => {
  return await prisma.worker.update({
    where: { idworker: Number(workerId) },
    data,
  });
};
const getWorkersByJobTitle = async (jobTitle) => {
  return await prisma.worker.findMany({ where: { jobTitle } });
};
module.exports = {
  getWorkers,
  createWorker,
  getWorkerByEmail,
  updateworker,
  getWorkersByJobTitle,
};
