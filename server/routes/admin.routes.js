const express = require("express");

const router = express.Router();

const { protect } = require("../middlewares/auth.middleware");
const adminOnly = require("../middlewares/admin.middleware");

const {
  getDashboardStats,
  getAllUsers,
  blockUser,
  unblockUser,
  addCreditsToUser,
  getAllListings,
  approveListing,
  rejectListing,
  togglePremium,
  toggleFeatured,
  toggleTrending,
  toggleVerification,
} = require("../controllers/admin.controller");

/*
|--------------------------------------------------------------------------
| Every route below requires:
|
| 1. Valid JWT
| 2. Admin role
|--------------------------------------------------------------------------
*/

router.use(protect);
router.use(adminOnly);

/*
|--------------------------------------------------------------------------
| Dashboard
|--------------------------------------------------------------------------
*/

router.get(
  "/dashboard",
  getDashboardStats
);

/*
|--------------------------------------------------------------------------
| Users
|--------------------------------------------------------------------------
*/

router.get(
  "/users",
  getAllUsers
);

router.put(
  "/users/:id/block",
  blockUser
);

router.put(
  "/users/:id/unblock",
  unblockUser
);

router.put(
  "/users/:id/credits",
  addCreditsToUser
);

/*
|--------------------------------------------------------------------------
| Listings
|--------------------------------------------------------------------------
*/

router.get(
  "/listings",
  getAllListings
);

router.put(
  "/listings/:id/approve",
  approveListing
);

router.put(
  "/listings/:id/reject",
  rejectListing
);

router.put(
  "/listings/:id/premium",
  togglePremium
);

router.put(
  "/listings/:id/featured",
  toggleFeatured
);

router.put(
  "/listings/:id/trending",
  toggleTrending
);

router.put(
  "/listings/:id/verify",
  toggleVerification
);

module.exports = router;