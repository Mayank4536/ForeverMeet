const express = require("express");

const router = express.Router();

const favoriteController = require("../controllers/favorite.controller");
const { protect } = require("../middlewares/auth.middleware");

/*
|--------------------------------------------------------------------------
| Favorites Routes
|--------------------------------------------------------------------------
*/

// Add Favorite
router.post(
  "/:listingId",
  protect,
  favoriteController.addFavorite
);

// Remove Favorite
router.delete(
  "/:listingId",
  protect,
  favoriteController.removeFavorite
);

// Get My Favorites
router.get(
  "/",
  protect,
  favoriteController.getMyFavorites
);

module.exports = router;