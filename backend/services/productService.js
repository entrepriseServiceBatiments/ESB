const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { cloudinary } = require("../cloudinaryConfig");
const getProducts = async () => {
  return await prisma.product.findMany({
    include: { Order: true, Favorites: true },
  });
};

const getProductById = async (id) => {
  try {
    const product = await prisma.product.findUnique({
      where: { idproducts: parseInt(id) },
    });
    return product;
  } catch (error) {
    console.error(`Failed to get product with ID ${id}:`, error);
    throw new Error(`Failed to get product with ID ${id}: ${error.message}`);
  }
};

const createProduct = async (req, res) => {
  try {
    const {
      name,
      category,
      description,
      price,
      rating,
      stock,
      numOfRatings,
      orderId,
    } = req.body;

    // Upload the picture to Cloudinary
    let pictureUrl = "";
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "products",
      });
      pictureUrl = result.secure_url;
    }
}
const getProductsByCateg = async (category) => {
  return await prisma.product.findMany({
    where: {
      category: category,
    },
  });
};

    const newProduct = await productService.createProduct({
      name,
      category,
      description,
      price,
      picture: pictureUrl,
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
const deleteProductById = async (id) => {
  try {
    await prisma.product.delete({
      where: { idproducts: parseInt(id) },
    });
    return { message: "Product deleted successfully" };
  } catch (error) {
    console.error(`Failed to delete product with ID ${id}:`, error);
    throw new Error(`Failed to delete product with ID ${id}: ${error.message}`);
  }
};

module.exports = {
  getProducts,
  getProductsByCateg,
  createProduct,
  getProductById,
  deleteProductById,
};
