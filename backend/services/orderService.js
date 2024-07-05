const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createOrder = async (data) => {
  try {
    const newOrder = await prisma.order.create({
      data: {
        startDate: data.startDate,
        endDate: data.endDate,
        clientId: data.clientId,
      },
    });
    return newOrder;
  } catch (error) {
    throw new Error(`Failed to create order: ${error.message}`);
  }
};

const getOrdersByClientId = async (clientId) => {
  try {
    const orders = await prisma.order.findMany({
      where: {
        clientId: clientId,
      },
      include: {
        Client: true,
        Workers: true,
        Products: true,
      },
    });
    return orders;
  } catch (error) {
    throw new Error(`Failed to fetch orders: ${error.message}`);
  }
};

const getAllOrders = async () => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        Client: true,
        Workers: true,
        Products: true,
      },
    });
    return orders;
  } catch (error) {
    throw new Error(`Failed to fetch all orders: ${error.message}`);
  }
};

module.exports = {
  createOrder,
  getOrdersByClientId,
  getAllOrders,
};
