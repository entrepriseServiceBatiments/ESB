const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getProducts = async () => {
  return await prisma.product.findMany({
    include: { Order: true, Favorites: true },
  });
};

const createProduct = async (data) => {
  try {
    const newProduct = await prisma.product.create({
      data: {
        name: data.name,
        category: data.category,
        description: data.description,
        price: data.price,
        picture: data.picture,
        rating: data.rating,
        stock: data.stock,
        numOfRatings: data.numOfRatings,
        orderId: data.orderId,
      },
    });
    return newProduct;
  } catch (error) {
    console.error("Failed to create product:", error);
    throw new Error(`Failed to create product: ${error.message}`);
  }
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
  createProduct,
  getProductById,
  deleteProductById,
};
