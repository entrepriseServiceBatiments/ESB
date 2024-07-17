const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/wishlistController');

router.get('/wishlist/:clientId', wishlistController.getFavorites);
router.post('/wishlist', wishlistController.addToWishlist);
router.delete('/wishlist', wishlistController.removeFromWishlist);

module.exports = router;
