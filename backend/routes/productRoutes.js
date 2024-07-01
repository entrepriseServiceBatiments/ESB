const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/products', productController.getProducts);
router.post('/products', productController.createProduct);
router.get("/products/:category",productController.getProductsByCateg)
module.exports = router;