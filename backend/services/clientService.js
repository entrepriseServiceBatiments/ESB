const { PrismaClient } = require("@prisma/client");
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

const updateClient = async (clientId) => {
  return await prisma.client.update({
    where: { idClient: Number(clientId) },
  });
};

const getClientById = async (clientId) => {
  return await prisma.client.findUnique({
    where: { idClient: Number(clientId) },
  });
};


module.exports = {
  getClients,
  createClient,
  updateClient,
  getClientById,
  getClientByEmail
};
