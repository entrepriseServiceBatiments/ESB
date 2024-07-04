const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

router.get("/client/:clientId", orderController.getOrdersByClientId);
router.get("/allOrders", orderController.getAllOrders);
router.post("/", orderController.createOrder);

module.exports = router;
