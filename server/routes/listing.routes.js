const express = require("express");

const router = express.Router();

const listingController = require("../controllers/listing.controller");

const { protect } = require("../middlewares/auth.middleware");

const upload = require("../middlewares/listingUpload.middleware");

const {
  createListingValidation,
} = require("../validations/listing.validation");

/**
 * ============================================================
 * GET ALL LISTINGS
 * ============================================================
 *
 * Example:
 * GET /api/listings
 *
 * Filters:
 * city
 * state
 * category
 * search
 * premium
 * featured
 * trending
 * verified
 * minPrice
 * maxPrice
 * sort
 */
router.get(
  "/",
  listingController.getListings
);

/**
 * ============================================================
 * SEARCH LISTINGS
 * ============================================================
 *
 * IMPORTANT:
 * This route MUST come before "/:slug"
 *
 * Examples:
 *
 * GET /api/listings/search?q=Pune
 *
 * GET /api/listings/search?q=Pune%20model
 *
 * GET /api/listings/search?q=Pune%20model%20girls
 *
 * GET /api/listings/search?q=Bangalore%20girls%20model
 */
router.get(
  "/search",
  listingController.searchListings
);

/**
 * ============================================================
 * GET MY LISTINGS
 * ============================================================
 */
router.get(
  "/my-listings",
  protect,
  listingController.getMyListings
);

/**
 * ============================================================
 * GET SINGLE LISTING
 * ============================================================
 *
 * Example:
 *
 * GET /api/listings/beautiful-model-ranchi-123456
 */
router.get(
  "/:slug",
  listingController.getSingleListing
);

/**
 * ============================================================
 * CREATE LISTING
 * ============================================================
 */
router.post(
  "/",
  protect,
  upload.array("images", 10),
  createListingValidation,
  listingController.createListing
);

/**
 * ============================================================
 * UPDATE LISTING
 * ============================================================
 */
router.put(
  "/:id",
  protect,
  upload.array("images", 10),
  listingController.updateListing
);

/**
 * ============================================================
 * RENEW LISTING
 * ============================================================
 */
router.put(
  "/renew/:id",
  protect,
  listingController.renewListing
);

/**
 * ============================================================
 * EXTEND LISTING
 * ============================================================
 */
router.put(
  "/extend/:id",
  protect,
  listingController.extendListing
);

/**
 * ============================================================
 * DELETE LISTING
 * ============================================================
 */
router.delete(
  "/:id",
  protect,
  listingController.deleteListing
);

module.exports = router;