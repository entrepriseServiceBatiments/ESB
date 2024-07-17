const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
router.get("/orders", orderController.getAllOrders);
router.get("/orders/client/:clientId", orderController.getClientOrders);
router.post("/orders", orderController.createOrder);
router.put("/orders/accept/:orderId", orderController.acceptOrder);
router.put("/orders/decline/:orderId", orderController.declineOrder);

module.exports = router;
