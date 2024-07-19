const PenOrder = require('../services/PenOrder');

const getPenOrders = async (req, res) => {
  try {
    const PenOrders = await PenOrder.getPenOrder();
    res.json(PenOrders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
async function createPenOrders(req, res, next) {
  const { clientId, amount, status, products } = req.body;

  try {
    console.log('Request body:', req.body);
    const PenOrders = await PenOrder.createPenOrder({
      clientId:clientId,
      amount:amount,
      status: status,
      Products: products,
    });
    console.log('PenOrders created:', PenOrders);
    res.status(201).json(PenOrders);
  } catch (error) {
    console.error('Error in controller:', error.message);
    next(error);
  }
}
async function updatePenOrders(req, res) {
  const { status } = req.body;
  const { clientId } = req.params; 
  try {
    const updatedPenOrders = await PenOrder.updatePenOrder(parseInt(clientId), { 
      status: status,
    });
    res.json(updatedPenOrders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getPenOrders,
  createPenOrders,
  updatePenOrders,
};
