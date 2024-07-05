const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

const getClients = async () => {
  return await prisma.client.findMany({
    include: { Orders: true, Favorites: true, Messages: true },
  });
};

const getClientByEmail = async (email) => {
  return await prisma.client.findUnique({ where: { email } });
};

const createClient = async (data) => {
  return await prisma.client.create({ data });
};

const updateClient = async (clientId, data) => { 
  return await prisma.client.update({
    where: { idClient: Number(clientId) },
    data, 
  });
};

const getClientById = async (clientId) => {
  return await prisma.client.findUnique({
    where: { idClient: Number(clientId) },
  });
};
const updatePassword = async (clientId, newPassword) => {
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  return await prisma.client.update({
    where: { idClient: Number(clientId) },
    data: { password: hashedPassword },
  });
};
module.exports = {
  getClients,
  createClient,
  updateClient,
  getClientById,
  getClientByEmail,
  updatePassword,
};
