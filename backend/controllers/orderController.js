const orderService = require("../services/orderService");
const prisma = require("../prisma");
const createOrder = async (req, res) => {
  try {
    const { clientId, products, startDate, endDate } = req.body;
    const order = await orderService.createOrder(
      clientId,
      products,
      startDate,
      endDate
    );
    res.status(201).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create order" });
  }
};

const getClientOrders = async (req, res) => {
  const clientId = parseInt(req.params.clientId, 10);

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

    res.status(200).json(clientOrders);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving orders" });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await orderService.getAllOrders();
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve all orders" });
  }
};

module.exports = {
  createOrder,
  getClientOrders,
  getAllOrders,
};
