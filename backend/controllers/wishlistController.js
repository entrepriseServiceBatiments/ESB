const wishlistService = require('../services/wishlistService');

const getFavorites = async (req, res) => {
  const { clientId } = req.params;

  if (!clientId) {
    return res.status(400).send('User ID is required');
  }

  try {
    const favorites = await wishlistService.getFavorites(clientId);
    res.status(200).send(favorites);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
const addToWishlist = async (req, res) => {
  const { clientId, productsId } = req.body;

  if (!clientId || !productsId) {
    return res.status(400).json({ error: "User ID and Product ID are required" });
  }

  try {
    const wishlistItem = await wishlistService.addToWishlist(clientId, productsId);
    res.status(201).json({ message: "Item added to wishlist", wishlistItem });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const removeFromWishlist = async (req, res) => {
  const { clientId, productsId } = req.body;

  if (!clientId || !productsId) {
    return res.status(400).send("User ID and Product ID are required");
  }

  try {
    const removedItem = await wishlistService.removeFromWishlist(clientId, productsId);
    res.status(200).send({ message: "Item removed from wishlist" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = {
  addToWishlist,
  removeFromWishlist,
  getFavorites,
};
