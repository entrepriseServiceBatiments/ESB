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
          // Ensure you specify the orderId correctly here
          orderId: data.orderId,  // Assuming orderId is passed in data
        },
      });
      return newProduct;
    } catch (error) {
      console.error('Failed to create product:', error);
      throw new Error(`Failed to create product: ${error.message}`);
    }
}
module.exports = {
  getProducts,
  createProduct,
};
