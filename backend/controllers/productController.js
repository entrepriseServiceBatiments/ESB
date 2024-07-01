const productService = require("../services/productService");

const getProducts = async (req, res) => {
  try {
    const products = await productService.getProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createProduct = async (req, res) => {
    try {
      const { name, category, description, price, picture, rating, stock, numOfRatings, orderId } = req.body;
      const newProduct = await productService.createProduct({
        name,
        category,
        description,
        price,
        picture,
        rating,
        stock,
        numOfRatings,
        orderId,  // Ensure orderId is provided
      });
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  const getProductsByCateg = async (req, res) => {
    try {
      const category = req.params.category;
      const products = await productService.getProductsByCateg(category);
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };



  
module.exports = {
  getProducts,
  createProduct,
  getProductsByCateg
};
