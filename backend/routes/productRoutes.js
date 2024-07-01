const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.get("/products", productController.getProducts);
router.get("/products/:id", productController.getProductById);
router.post("/products", productController.createProduct);
router.delete("/products/:id", productController.deleteProductById);
module.exports = router;
