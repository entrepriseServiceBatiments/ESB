const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");

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

const updatePassword = async (workerId, newPassword) => {
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  return await prisma.worker.update({
    where: { idworker: Number(workerId) },
    data: { password: hashedPassword },
  });
};
const getClientById = async (clientId) => {
  return await prisma.worker.findUnique({
    where: { idworker: Number(clientId) },
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

  updatePassword,
  getClientById


};
