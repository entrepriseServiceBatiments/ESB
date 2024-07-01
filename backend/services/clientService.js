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

// Export the functions to be used in the controller
module.exports = {
  getClients,
  createClient,
  getClientByEmail
};
