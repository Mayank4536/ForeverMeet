const Favorite = require("../models/Favorite");
const Listing = require("../models/Listing");

/*
|--------------------------------------------------------------------------
| Add to Favorites
|--------------------------------------------------------------------------
*/
exports.addFavorite = async (req, res) => {
  try {
    const { listingId } = req.params;

    // Check if listing exists
    const listing = await Listing.findById(listingId);

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: "Listing not found.",
      });
    }

    // Check if already favorited
    const existingFavorite = await Favorite.findOne({
      user: req.user._id,
      listing: listingId,
    });

    if (existingFavorite) {
      return res.status(400).json({
        success: false,
        message: "Listing already added to favorites.",
      });
    }

    // Create favorite
    await Favorite.create({
      user: req.user._id,
      listing: listingId,
    });

    // Increase favorite count
    listing.favorites += 1;

    await listing.save();

    return res.status(201).json({
      success: true,
      message: "Listing added to favorites successfully.",
      favorites: listing.favorites,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
|--------------------------------------------------------------------------
| Remove Favorite
|--------------------------------------------------------------------------
*/

exports.removeFavorite = async (req, res) => {
  try {
    const { listingId } = req.params;

    // Find favorite
    const favorite = await Favorite.findOne({
      user: req.user._id,
      listing: listingId,
    });

    if (!favorite) {
      return res.status(404).json({
        success: false,
        message: "Favorite not found.",
      });
    }

    // Find listing
    const listing = await Listing.findById(listingId);

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: "Listing not found.",
      });
    }

    // Delete favorite
    await Favorite.findByIdAndDelete(favorite._id);

    // Decrease favorites count
    listing.favorites = Math.max(0, listing.favorites - 1);

    await listing.save();

    return res.status(200).json({
      success: true,
      message: "Listing removed from favorites successfully.",
      favorites: listing.favorites,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
|--------------------------------------------------------------------------
| Get My Favorite Listings
|--------------------------------------------------------------------------
*/
exports.getMyFavorites = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 12;

    const skip = (page - 1) * limit;

    const totalFavorites = await Favorite.countDocuments({
      user: req.user._id,
    });

    const favorites = await Favorite.find({
      user: req.user._id,
    })
      .populate({
        path: "listing",
        match: {
          status: "approved",
          expiresAt: {
            $gt: new Date(),
          },
        },
      })
      .sort({
        createdAt: -1,
      })
      .skip(skip)
      .limit(limit);

    // Remove deleted/unapproved listings
    const listings = favorites
      .filter((favorite) => favorite.listing)
      .map((favorite) => favorite.listing);

    return res.status(200).json({
      success: true,
      totalFavorites,
      currentPage: page,
      totalPages: Math.ceil(totalFavorites / limit),
      listings,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
