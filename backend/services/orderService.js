const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createOrder = async (clientId, products, startDate, endDate) => {
  const order = await prisma.order.create({
    data: {
      clientId,
      startDate,
      endDate,
      Products: {
        create: products.map((product) => ({
          productId: product.idproducts,
        })),
      },
    },
    include: {
      Products: true,
    },
  });

  return order;
};

const getClientOrders = async (clientId) => {
  const orders = await prisma.order.findMany({
    where: {
      clientId: parseInt(clientId),
    },
    include: {
      Products: true,
    },
  });

  return orders;
};

const getAllOrders = async () => {
  const orders = await prisma.order.findMany({
    include: {
      Products: true,
    },
  });

  return orders;
};

module.exports = {
  createOrder,
  getClientOrders,
  getAllOrders,
};
