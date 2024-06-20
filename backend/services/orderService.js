const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createOrder = async (data) => {
  try {
    const newOrder = await prisma.order.create({
      data: {
        startDate: data.startDate,
        endDate: data.endDate,
        clientId: data.clientId,
        // You can add other fields as needed
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
        Client: true, // Include Client details if needed
        Workers: true, // Include Workers associated with the order
        Products: true, // Include Products associated with the order
      },
    });
    return orders;
  } catch (error) {
    throw new Error(`Failed to fetch orders: ${error.message}`);
  }
};

module.exports = {
  createOrder,
  getOrdersByClientId,
};
