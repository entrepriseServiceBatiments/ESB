const orderService = require("../services/orderService");

const createOrder = async (req, res) => {
  try {
    const { startDate, endDate, clientId } = req.body;
    const newOrder = await orderService.createOrder({
      startDate,
      endDate,
      clientId,
    });
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getOrdersByClientId = async (req, res) => {
  try {
    const { clientId } = req.params;
    const orders = await orderService.getOrdersByClientId(parseInt(clientId));
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getAllOrders = async (req, res) => {
  try {
    const orders = await orderService.getAllOrders();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createOrder,
  getOrdersByClientId,
  getAllOrders,
};
