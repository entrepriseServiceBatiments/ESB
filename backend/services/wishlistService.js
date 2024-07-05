const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const addToWishlist = async (clientId, productsId) => {
  try {
    const existingWishlistItem = await prisma.wishlist.findUnique({
      where: {
        clientId_productsId: {
          clientId: parseInt(clientId),
          productsId: parseInt(productsId),
        },
      },
    });

    if (existingWishlistItem) {
      throw new Error('Item is already in the wishlist');
    }

    const wishlistItem = await prisma.wishlist.create({
      data: {
        clientId: parseInt(clientId),
        productsId: parseInt(productsId),
      },
    });

    return wishlistItem;
  } catch (error) {
    console.error('Error adding item to wishlist:', error);
    throw new Error(`Error adding item to wishlist: ${error.message}`);
  }
};

const removeFromWishlist = async (clientId, productsId) => {
  try {
    const removedItem = await prisma.wishlist.deleteMany({
      where: {
        clientId: parseInt(clientId),
        productsId: parseInt(productsId),
      },
    });

    if (removedItem.count === 0) {
      throw new Error('Item not found in the wishlist');
    }

    return removedItem;
  } catch (error) {
    console.error('Error removing item from wishlist:', error);
    throw new Error(`Error removing item from wishlist: ${error.message}`);
  }
};

module.exports = {
  addToWishlist,
  removeFromWishlist,
};
