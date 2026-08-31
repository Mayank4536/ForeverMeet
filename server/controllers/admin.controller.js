const User = require("../models/User");
const Listing = require("../models/Listing");

/*
|--------------------------------------------------------------------------
| Admin Dashboard Statistics
|--------------------------------------------------------------------------
*/
exports.getDashboardStats = async (req, res) => {
  try {
    const [
      totalUsers,
      verifiedUsers,
      blockedUsers,
      adminUsers,
      totalListings,
      pendingListings,
      approvedListings,
      rejectedListings,
      premiumListings,
      featuredListings,
      trendingListings,
      verifiedListings,
      recentUsers,
      recentListings,
    ] = await Promise.all([
      User.countDocuments(),

      User.countDocuments({
        isEmailVerified: true,
      }),

      User.countDocuments({
        isBlocked: true,
      }),

      User.countDocuments({
        role: "admin",
      }),

      Listing.countDocuments(),

      Listing.countDocuments({
        status: "pending",
      }),

      Listing.countDocuments({
        status: "approved",
      }),

      Listing.countDocuments({
        status: "rejected",
      }),

      Listing.countDocuments({
        isPremium: true,
      }),

      Listing.countDocuments({
        isFeatured: true,
      }),

      Listing.countDocuments({
        isTrending: true,
      }),

      Listing.countDocuments({
        isVerified: true,
      }),

      User.find()
        .select(
          "name email profileImage city role isEmailVerified isBlocked lastLogin createdAt"
        )
        .sort({
          createdAt: -1,
        })
        .limit(5)
        .lean(),

      Listing.find()
        .populate("user", "name email")
        .select(
          "title category city status isPremium isFeatured isTrending isVerified views user createdAt"
        )
        .sort({
          createdAt: -1,
        })
        .limit(5)
        .lean(),
    ]);

    const usersWithCredits = await User.find()
      .select("wallet.credits")
      .lean();

    const totalCreditsPurchased = usersWithCredits.reduce(
      (total, user) =>
        total + Number(user.wallet?.totalPurchased || 0),
      0
    );

    const totalCreditsSpent = usersWithCredits.reduce(
      (total, user) =>
        total + Number(user.wallet?.totalSpent || 0),
      0
    );

    const totalCreditsRemaining = usersWithCredits.reduce(
      (total, user) =>
        total + Number(user.wallet?.credits || 0),
      0
    );

    return res.status(200).json({
      success: true,
      message: "Admin dashboard statistics loaded successfully",

      statistics: {
        users: {
          total: totalUsers,
          verified: verifiedUsers,
          blocked: blockedUsers,
          admins: adminUsers,
          regular: totalUsers - adminUsers,
        },

        listings: {
          total: totalListings,
          pending: pendingListings,
          approved: approvedListings,
          rejected: rejectedListings,
          premium: premiumListings,
          featured: featuredListings,
          trending: trendingListings,
          verified: verifiedListings,
        },

        wallet: {
          totalCreditsPurchased,
          totalCreditsSpent,
          totalCreditsRemaining,
        },
      },

      recentUsers,
      recentListings,
    });
  } catch (error) {
    console.error("Admin dashboard statistics error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to load admin dashboard statistics",
    });
  }
};

/*
|--------------------------------------------------------------------------
| Get All Users
|--------------------------------------------------------------------------
*/
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select(
        "-password -emailOTP -otpExpire -resetOTP -resetOTPExpire"
      )
      .sort({
        createdAt: -1,
      })
      .lean();

    return res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    console.error("Get all users error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to load users",
    });
  }
};

/*
|--------------------------------------------------------------------------
| Block User
|--------------------------------------------------------------------------
*/
exports.blockUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (req.user._id.toString() === id) {
      return res.status(400).json({
        success: false,
        message: "You cannot block your own admin account",
      });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.role === "admin") {
      return res.status(400).json({
        success: false,
        message: "Admin accounts cannot be blocked",
      });
    }

    user.isBlocked = true;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "User blocked successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isBlocked: user.isBlocked,
      },
    });
  } catch (error) {
    console.error("Block user error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to block user",
    });
  }
};

/*
|--------------------------------------------------------------------------
| Unblock User
|--------------------------------------------------------------------------
*/
exports.unblockUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.isBlocked = false;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "User unblocked successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isBlocked: user.isBlocked,
      },
    });
  } catch (error) {
    console.error("Unblock user error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to unblock user",
    });
  }
};

/*
|--------------------------------------------------------------------------
| Add Credits To User
|--------------------------------------------------------------------------
*/
exports.addCreditsToUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { credits } = req.body;

    const amount = Number(credits);

    if (!Number.isFinite(amount) || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Credits must be a number greater than 0",
      });
    }

    if (!Number.isInteger(amount)) {
      return res.status(400).json({
        success: false,
        message: "Credits must be a whole number",
      });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (!user.wallet) {
      user.wallet = {
        credits: 0,
        totalPurchased: 0,
        totalSpent: 0,
      };
    }

    user.wallet.credits =
      Number(user.wallet.credits || 0) + amount;

    /*
     * Admin-added credits are recorded as purchased credits
     * so the dashboard wallet totals remain consistent.
     */
    user.wallet.totalPurchased =
      Number(user.wallet.totalPurchased || 0) + amount;

    await user.save();

    return res.status(200).json({
      success: true,
      message: `${amount} credits added successfully`,

      user: {
        _id: user._id,
        name: user.name,
        email: user.email,

        wallet: {
          credits: user.wallet.credits,
          totalPurchased: user.wallet.totalPurchased,
          totalSpent: user.wallet.totalSpent,
        },
      },
    });
  } catch (error) {
    console.error("Add credits error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to add credits",
    });
  }
};

/*
|--------------------------------------------------------------------------
| Get All Listings
|--------------------------------------------------------------------------
*/
exports.getAllListings = async (req, res) => {
  try {
    const listings = await Listing.find()
      .populate("user", "name email")
      .sort({
        createdAt: -1,
      })
      .lean();

    return res.status(200).json({
      success: true,
      count: listings.length,
      listings,
    });
  } catch (error) {
    console.error("Get all listings error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to load listings",
    });
  }
};

/*
|--------------------------------------------------------------------------
| Approve Listing
|--------------------------------------------------------------------------
*/
exports.approveListing = async (req, res) => {
  try {
    const { id } = req.params;

    const listing = await Listing.findById(id);

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: "Listing not found",
      });
    }

    listing.status = "approved";

    await listing.save();

    return res.status(200).json({
      success: true,
      message: "Listing approved successfully",
      listing,
    });
  } catch (error) {
    console.error("Approve listing error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to approve listing",
    });
  }
};

/*
|--------------------------------------------------------------------------
| Reject Listing
|--------------------------------------------------------------------------
*/
exports.rejectListing = async (req, res) => {
  try {
    const { id } = req.params;

    const listing = await Listing.findById(id);

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: "Listing not found",
      });
    }

    listing.status = "rejected";

    await listing.save();

    return res.status(200).json({
      success: true,
      message: "Listing rejected successfully",
      listing,
    });
  } catch (error) {
    console.error("Reject listing error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to reject listing",
    });
  }
};

/*
|--------------------------------------------------------------------------
| Toggle Premium
|--------------------------------------------------------------------------
*/
exports.togglePremium = async (req, res) => {
  try {
    const { id } = req.params;

    const listing = await Listing.findById(id);

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: "Listing not found",
      });
    }

    listing.isPremium = !listing.isPremium;

    await listing.save();

    return res.status(200).json({
      success: true,
      message: listing.isPremium
        ? "Listing marked as premium"
        : "Premium status removed",
      listing,
    });
  } catch (error) {
    console.error("Toggle premium error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update premium status",
    });
  }
};

/*
|--------------------------------------------------------------------------
| Toggle Featured
|--------------------------------------------------------------------------
*/
exports.toggleFeatured = async (req, res) => {
  try {
    const { id } = req.params;

    const listing = await Listing.findById(id);

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: "Listing not found",
      });
    }

    listing.isFeatured = !listing.isFeatured;

    await listing.save();

    return res.status(200).json({
      success: true,
      message: listing.isFeatured
        ? "Listing marked as featured"
        : "Featured status removed",
      listing,
    });
  } catch (error) {
    console.error("Toggle featured error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update featured status",
    });
  }
};

/*
|--------------------------------------------------------------------------
| Toggle Trending
|--------------------------------------------------------------------------
*/
exports.toggleTrending = async (req, res) => {
  try {
    const { id } = req.params;

    const listing = await Listing.findById(id);

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: "Listing not found",
      });
    }

    listing.isTrending = !listing.isTrending;

    await listing.save();

    return res.status(200).json({
      success: true,
      message: listing.isTrending
        ? "Listing marked as trending"
        : "Trending status removed",
      listing,
    });
  } catch (error) {
    console.error("Toggle trending error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update trending status",
    });
  }
};

/*
|--------------------------------------------------------------------------
| Toggle Verification
|--------------------------------------------------------------------------
*/
exports.toggleVerification = async (req, res) => {
  try {
    const { id } = req.params;

    const listing = await Listing.findById(id);

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: "Listing not found",
      });
    }

    listing.isVerified = !listing.isVerified;

    await listing.save();

    return res.status(200).json({
      success: true,
      message: listing.isVerified
        ? "Listing verified successfully"
        : "Listing verification removed",
      listing,
    });
  } catch (error) {
    console.error("Toggle verification error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update verification status",
    });
  }
};