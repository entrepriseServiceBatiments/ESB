const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { cloudinary } = require('../cloudinaryConfig');

const getProducts = async () => {
  return await prisma.product.findMany({
    // include: { Order: true, Favorites: true },
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

const createProduct = async (data) => {
  try {
    console.log('Creating product with data:', data); 
    const product = await prisma.product.create({ data });
    return product;
  } catch (error) {
    console.error('Error creating product:', error.message); 
    throw new Error(`Could not create product: ${error.message}`);
  }
};

const getProductsByCateg = async (category) => {
  return await prisma.product.findMany({
    where: {
      category: category,
    },
  });
};

const deleteProductById = async (id) => {
  try {
    await prisma.product.delete({
      where: { idproducts: parseInt(id) },
    });
    return { message: 'Product deleted successfully' };
  } catch (error) {
    console.error(`Failed to delete product with ID ${id}:`, error);
    throw new Error(`Failed to delete product with ID ${id}: ${error.message}`);
  }
};

module.exports = {
  getProducts,
  getProductById,
  getProductsByCateg,
  createProduct,
  deleteProductById,
};
