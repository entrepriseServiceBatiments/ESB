const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getFavorites = async (clientId) => {
  try {
    const favorites = await prisma.favorite.findMany({
      where: {
        clientId: parseInt(clientId),
      },
      include: {
        Product: true, 
      },
    });

    return favorites.map(fav => fav.Product);
  } catch (error) {
    console.error('Error fetching favorites:', error);
    throw new Error(`Error fetching favorites: ${error.message}`);
  }
};

const addToWishlist = async (clientId, productsId) => {
  console.log(prisma);
  try {
    const existingWishlistItem = await prisma.favorite.findUnique({
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

    const wishlistItem = await prisma.favorite.create({
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
    const removedItem = await prisma.favorite.deleteMany({
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
  getFavorites
};
