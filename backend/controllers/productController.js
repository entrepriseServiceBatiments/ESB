const productService = require("../services/productService");

const getProducts = async (req, res) => {
  try {
    const products = await productService.getProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
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

const createProduct = async (req, res) => {
  try {
    const {
      name,
      category,
      description,
      price,
      picture,
      rating,
      stock,
      numOfRatings,
      orderId,
    } = req.body;
    const newProduct = await productService.createProduct({
      name,
      category,
      description,
      price,
      picture,
      rating,
      stock,
      numOfRatings,
      orderId,
    });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteProductById = async (req, res) => {
  try {
    const result = await productService.deleteProductById(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getProducts,
  getProductById,
  getProductsByCateg,
  createProduct,
  deleteProductById,
};
