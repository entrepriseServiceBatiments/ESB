const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const { upload } = require("../cloudinaryConfig");

router.get('/products', productController.getProducts);
router.post('/products', productController.createProduct);
router.get("/products/:category",productController.getProductsByCateg)
router.get("/products/:id", productController.getProductById);
router.post(
  "/products",
  upload.single("picture"),
  productController.createProduct
);

router.delete("/products/:id", productController.deleteProductById);
module.exports = router;
