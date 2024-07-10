const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createOrder = async (clientId, products, startDate, endDate) => {
  try {
    const order = await prisma.order.create({
      data: {
        clientId,
        startDate,
        endDate,
        status: "pending", // Default status
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
  } catch (error) {
    console.error("Error creating order:", error);
    throw new Error("Failed to create order");
  }
};

const getAllOrders = async () => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        Products: {
          include: {
            Product: true,
          },
        },
      },
    });
    return orders;
  } catch (error) {
    console.error("Error retrieving orders:", error);
    throw new Error("Failed to retrieve orders");
  }
};

const getClientOrders = async (clientId) => {
  try {
    const clientOrders = await prisma.order.findMany({
      where: { clientId },
      include: {
        Products: {
          include: {
            Product: true,
          },
        },
      },
    });
    return clientOrders;
  } catch (error) {
    console.error("Error retrieving client orders:", error);
    throw new Error("Failed to retrieve client orders");
  }
};

const acceptOrder = async (orderId) => {
  try {
    const order = await prisma.order.update({
      where: { idorders: orderId },
      data: { status: "accepted" },
    });
    return order;
  } catch (error) {
    console.error("Error accepting order:", error);
    throw new Error("Failed to accept order");
  }
};

const declineOrder = async (orderId) => {
  try {
    const order = await prisma.order.update({
      where: { idorders: orderId },
      data: { status: "declined" },
    });
    return order;
  } catch (error) {
    console.error("Error declining order:", error);
    throw new Error("Failed to decline order");
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getClientOrders,
  acceptOrder,
  declineOrder,
};
