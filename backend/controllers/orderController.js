const orderService = require("../services/orderService");

const createOrder = async (req, res) => {
  try {
    const { clientId, products, startDate, endDate } = req.body;
    console.log(req.body);
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
    const clientOrders = await orderService.getClientOrders(clientId);
    res.status(200).json(clientOrders);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving client orders" });
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

const acceptOrder = async (req, res) => {
  const orderId = parseInt(req.params.orderId, 10);

  try {
    const order = await orderService.acceptOrder(orderId);
    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to accept order" });
  }
};

const declineOrder = async (req, res) => {
  const orderId = parseInt(req.params.orderId, 10);

  try {
    const order = await orderService.declineOrder(orderId);
    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to decline order" });
  }
};

module.exports = {
  createOrder,
  getClientOrders,
  getAllOrders,
  acceptOrder,
  declineOrder,
};
