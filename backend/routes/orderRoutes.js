const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

router.post("/orders", orderController.createOrder);
router.get("/orders/client/:clientId", orderController.getClientOrders);
router.get("/orders", orderController.getAllOrders);

module.exports = router;
