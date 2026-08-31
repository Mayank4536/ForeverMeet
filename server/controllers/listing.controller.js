const { validationResult } = require("express-validator");
const slugify = require("slugify");
const cloudinary = require("../config/cloudinary");

const Listing = require("../models/Listing");
const User = require("../models/User");
const createCreditTransaction = require("../utils/creditTransaction");

/*
|--------------------------------------------------------------------------
| Create Listing
|--------------------------------------------------------------------------
*/
exports.createListing = async (req, res) => {
  try {
    // Validation Errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const {
      title,
      description,
      name,
      age,
      height,
      weight,
      category,
      city,
      state,
      phone,
      whatsapp,
      price,
      languages,
      services,
      bio,

      isPremium,
      isFeatured,
      isTrending,
      isHomepageHighlight,
      isUrgent,
      isTopCity,

      listingDurationWeeks,
    } = req.body;

    // Find User
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // Images Required
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please upload at least one image.",
      });
    }

    // Convert Cloudinary files
    const images = req.files.map((file) => ({
      url: file.path,
      publicId: file.filename,
    }));

    // -------------------------
    // Calculate Credits
    // -------------------------

    let creditsRequired = 10;

    if (isPremium === "true") creditsRequired += 5;

    if (isHomepageHighlight === "true") creditsRequired += 10;

    if (isUrgent === "true") creditsRequired += 3;

    if (isTopCity === "true") creditsRequired += 15;

    const weeks = Number(listingDurationWeeks || 1);

    const allowedDurations = [1, 2, 4, 8];

    if (!allowedDurations.includes(weeks)) {
      return res.status(400).json({
        success: false,
        message: "Listing duration must be 1, 2, 4, or 8 weeks.",
      });
    }

    if (weeks > 1) {
      creditsRequired += (weeks - 1) * 5;
    }

    // -------------------------
    // Check Wallet
    // -------------------------

    if (user.wallet.credits < creditsRequired) {
      return res.status(400).json({
        success: false,
        message: `Insufficient credits. Required ${creditsRequired} credits.`,
      });
    }

    // Deduct Credits
    const balanceBefore = user.wallet.credits;

    user.wallet.credits -= creditsRequired;
    user.wallet.totalSpent += creditsRequired;

    await user.save();

    const balanceAfter = user.wallet.credits;

    // -------------------------
    // Expiry Date
    // -------------------------

    const expiresAt = new Date();

    expiresAt.setDate(expiresAt.getDate() + weeks * 7);

    // -------------------------
    // SEO Slug
    // -------------------------

    const slug =
      slugify(`${title}-${city}`, {
        lower: true,
        strict: true,
      }) +
      "-" +
      Date.now();

    // -------------------------
    // Create Listing
    // -------------------------

    const listing = await Listing.create({
      title,
      description,
      name,
      age,
      height,
      weight,

      category,
      city,
      state,

      phone,
      whatsapp,

      price,

      languages,
      services,

      bio,

      images,

      isPremium,
      isFeatured,
      isTrending,
      isHomepageHighlight,
      isUrgent,
      isTopCity,

      listingDurationWeeks: weeks,

      expiresAt,

      slug,

      user: user._id,
    });

    await createCreditTransaction({
      user: user._id,
      listing: listing._id,
      type: "listing_create",
      credits: creditsRequired,
      balanceBefore,
      balanceAfter,
      description: "Credits used to create listing",
    });

    return res.status(201).json({
      success: true,
      message: "Listing created successfully.",
      creditsUsed: creditsRequired,
      remainingCredits: user.wallet.credits,
      listing,
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
| Get All Listings
|--------------------------------------------------------------------------
*/
exports.getListings = async (req, res) => {
  try {
    let {
      page = 1,
      limit = 12,
      city,
      state,
      category,
      search,
      premium,
      featured,
      trending,
      verified,
      minPrice,
      maxPrice,
      sort = "latest",
    } = req.query;

    page = Number(page);
    limit = Number(limit);

    const query = {
      status: "approved",
      expiresAt: { $gt: new Date() },
    };

    // -------------------------
    // Filters
    // -------------------------

    if (city) {
      query.city = new RegExp(city, "i");
    }

    if (state) {
      query.state = new RegExp(state, "i");
    }

    if (category) {
      query.category = new RegExp(category, "i");
    }

    if (premium === "true") {
      query.isPremium = true;
    }

    if (featured === "true") {
      query.isFeatured = true;
    }

    if (trending === "true") {
      query.isTrending = true;
    }

    if (verified === "true") {
      query.isVerified = true;
    }

    // -------------------------
    // Price Filter
    // -------------------------

    if (minPrice || maxPrice) {
      query.price = {};

      if (minPrice) query.price.$gte = Number(minPrice);

      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // -------------------------
    // Search
    // -------------------------

    if (search) {
      query.$text = {
        $search: search,
      };
    }

    // -------------------------
    // Sorting
    // -------------------------

    let sortOption = {};

    switch (sort) {
      case "oldest":
        sortOption = {
          createdAt: 1,
        };
        break;

      case "priceLow":
        sortOption = {
          price: 1,
        };
        break;

      case "priceHigh":
        sortOption = {
          price: -1,
        };
        break;

      case "views":
        sortOption = {
          views: -1,
        };
        break;

      default:
        sortOption = {
          isPremium: -1,
          isFeatured: -1,
          isTrending: -1,
          createdAt: -1,
        };
    }

    // -------------------------
    // Pagination
    // -------------------------

    const totalListings = await Listing.countDocuments(query);

    const listings = await Listing.find(query)
      .populate("user", "name city state")
      .sort(sortOption)
      .skip((page - 1) * limit)
      .limit(limit);

    return res.status(200).json({
      success: true,

      totalListings,

      currentPage: page,

      totalPages: Math.ceil(totalListings / limit),

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

/*
|--------------------------------------------------------------------------
| Get Single Listing
|--------------------------------------------------------------------------
*/
exports.getSingleListing = async (req, res) => {
  try {
    const { slug } = req.params;

    // Find listing
    const listing = await Listing.findOne({
      slug,
      status: "approved",
      expiresAt: { $gt: new Date() },
    }).populate(
      "user",
      "name email phone city state profileImage isEmailVerified",
    );

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: "Listing not found.",
      });
    }

    // Increase Views
    listing.views += 1;
    await listing.save();

    // Similar Listings
    const similarListings = await Listing.find({
      _id: { $ne: listing._id },
      city: listing.city,
      category: listing.category,
      status: "approved",
      expiresAt: { $gt: new Date() },
    })
      .sort({
        isPremium: -1,
        createdAt: -1,
      })
      .limit(8)
      .select(
        "title slug city price images isPremium isFeatured isVerified createdAt",
      );

    return res.status(200).json({
      success: true,
      listing,
      similarListings,
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
| Get My Listings
|--------------------------------------------------------------------------
*/
exports.getMyListings = async (req, res) => {
  try {
    let { page = 1, limit = 10 } = req.query;

    page = Number(page);
    limit = Number(limit);

    const totalListings = await Listing.countDocuments({
      user: req.user._id,
    });

    const listings = await Listing.find({
      user: req.user._id,
    })
      .sort({
        createdAt: -1,
      })
      .skip((page - 1) * limit)
      .limit(limit);

    return res.status(200).json({
      success: true,

      totalListings,

      currentPage: page,

      totalPages: Math.ceil(totalListings / limit),

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

/*
|--------------------------------------------------------------------------
| Update Listing
|--------------------------------------------------------------------------
*/
exports.updateListing = async (req, res) => {
  try {
    const { id } = req.params;

    const listing = await Listing.findOne({
      _id: id,
      user: req.user._id,
    });

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: "Listing not found.",
      });
    }

    const fields = [
      "title",
      "description",
      "name",
      "age",
      "height",
      "weight",
      "category",
      "city",
      "state",
      "phone",
      "whatsapp",
      "price",
      "bio",
    ];

    fields.forEach((field) => {
      if (req.body[field] !== undefined) {
        listing[field] = req.body[field];
      }
    });

    if (req.body.languages) {
      listing.languages = Array.isArray(req.body.languages)
        ? req.body.languages
        : JSON.parse(req.body.languages);
    }

    if (req.body.services) {
      listing.services = Array.isArray(req.body.services)
        ? req.body.services
        : JSON.parse(req.body.services);
    }

    /******************************
     * Delete Selected Images
     ******************************/
    if (req.body.deletedImages) {
      let deletedImages = req.body.deletedImages;

      // If sent as JSON string from form-data
      if (typeof deletedImages === "string") {
        deletedImages = JSON.parse(deletedImages);
      }

      // Delete from Cloudinary
      for (const publicId of deletedImages) {
        await cloudinary.uploader.destroy(publicId);
      }

      // Remove from MongoDB
      listing.images = listing.images.filter(
        (img) => !deletedImages.includes(img.publicId),
      );
    }

    /******************************
     * Check Maximum Images
     ******************************/
    const currentImages = listing.images.length;
    const newImagesCount = req.files ? req.files.length : 0;

    if (currentImages + newImagesCount > 10) {
      return res.status(400).json({
        success: false,
        message: "Maximum 10 images are allowed per listing.",
      });
    }

    /******************************
     * Upload New Images
     ******************************/
    if (req.files && req.files.length > 0) {
      const newImages = req.files.map((file) => ({
        url: file.path,
        publicId: file.filename,
      }));

      listing.images.push(...newImages);
    }

    await listing.save();

    return res.status(200).json({
      success: true,
      message: "Listing updated successfully.",
      listing,
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
| Delete Listing
|--------------------------------------------------------------------------
*/
exports.deleteListing = async (req, res) => {
  try {
    const { id } = req.params;

    // Find listing
    const listing = await Listing.findOne({
      _id: id,
      user: req.user._id,
    });

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: "Listing not found.",
      });
    }

    // Delete all images from Cloudinary
    if (listing.images.length > 0) {
      for (const image of listing.images) {
        if (image.publicId) {
          await cloudinary.uploader.destroy(image.publicId);
        }
      }
    }

    // Delete listing
    await Listing.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Listing deleted successfully.",
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
| Renew Listing
|--------------------------------------------------------------------------
*/
exports.renewListing = async (req, res) => {
  try {
    const { id } = req.params;

    // Duration selected by user
    const durationWeeks = Number(req.body.listingDurationWeeks || 1);

    const allowedDurations = [1, 2, 4, 8];

    if (!allowedDurations.includes(durationWeeks)) {
      return res.status(400).json({
        success: false,
        message: "Listing duration must be 1, 2, 4 or 8 weeks.",
      });
    }

    // Find listing belonging to logged-in user
    const listing = await Listing.findOne({
      _id: id,
      user: req.user._id,
    });

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: "Listing not found.",
      });
    }

    // Find user
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // ---------------------------------------------------------
    // Calculate renewal credits
    // 1 week = 5 credits
    // 2 weeks = 10 credits
    // 4 weeks = 20 credits
    // 8 weeks = 40 credits
    // ---------------------------------------------------------

    const renewalCredits = durationWeeks * 5;

    // Check wallet
    if (user.wallet.credits < renewalCredits) {
      return res.status(400).json({
        success: false,
        message: `You need ${renewalCredits} credits to renew this listing.`,
      });
    }

    // ---------------------------------------------------------
    // Wallet
    // ---------------------------------------------------------

    const balanceBefore = user.wallet.credits;

    user.wallet.credits -= renewalCredits;
    user.wallet.totalSpent += renewalCredits;

    await user.save();

    const balanceAfter = user.wallet.credits;

    // ---------------------------------------------------------
    // New expiry date
    // ---------------------------------------------------------

    const expiresAt = new Date();

    expiresAt.setDate(expiresAt.getDate() + durationWeeks * 7);

    // ---------------------------------------------------------
    // Update listing
    // ---------------------------------------------------------

    listing.expiresAt = expiresAt;

    listing.listingDurationWeeks = durationWeeks;

    // IMPORTANT:
    // After user pays for renewal, automatically approve
    // the expired listing again.
    listing.status = "approved";

    await listing.save();

    // ---------------------------------------------------------
    // Credit transaction
    // ---------------------------------------------------------

    await createCreditTransaction({
      user: user._id,
      listing: listing._id,
      type: "listing_renew",
      credits: renewalCredits,
      balanceBefore,
      balanceAfter,
      description: `Credits used to renew listing for ${durationWeeks} ${
        durationWeeks === 1 ? "week" : "weeks"
      }`,
    });

    // ---------------------------------------------------------
    // Response
    // ---------------------------------------------------------

    return res.status(200).json({
      success: true,

      message: "Listing renewed and approved successfully.",

      creditsUsed: renewalCredits,

      remainingCredits: user.wallet.credits,

      expiresAt: listing.expiresAt,

      status: listing.status,

      listing,
    });
  } catch (error) {
    console.error("Renew Listing Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
|--------------------------------------------------------------------------
| Extend Listing
|--------------------------------------------------------------------------
*/
exports.extendListing = async (req, res) => {
  try {
    const { id } = req.params;

    // Duration selected by user
    const durationWeeks = Number(req.body.listingDurationWeeks || 1);

    const allowedDurations = [1, 2, 4, 8];

    if (!allowedDurations.includes(durationWeeks)) {
      return res.status(400).json({
        success: false,
        message: "Listing duration must be 1, 2, 4 or 8 weeks.",
      });
    }

    // ---------------------------------------------------------
    // Find listing
    // ---------------------------------------------------------

    const listing = await Listing.findOne({
      _id: id,
      user: req.user._id,
    });

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: "Listing not found.",
      });
    }

    // ---------------------------------------------------------
    // Find user
    // ---------------------------------------------------------

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // ---------------------------------------------------------
    // Calculate credits
    //
    // 1 week = 5 credits
    // 2 weeks = 10 credits
    // 4 weeks = 20 credits
    // 8 weeks = 40 credits
    // ---------------------------------------------------------

    const extensionCredits = durationWeeks * 5;

    // ---------------------------------------------------------
    // Check credits
    // ---------------------------------------------------------

    if (user.wallet.credits < extensionCredits) {
      return res.status(400).json({
        success: false,
        message: `You need ${extensionCredits} credits to extend this listing.`,
      });
    }

    // ---------------------------------------------------------
    // Wallet transaction
    // ---------------------------------------------------------

    const balanceBefore = user.wallet.credits;

    user.wallet.credits -= extensionCredits;
    user.wallet.totalSpent += extensionCredits;

    await user.save();

    const balanceAfter = user.wallet.credits;

    // ---------------------------------------------------------
    // Calculate expiry
    // ---------------------------------------------------------

    let expiryDate;

    const now = new Date();

    // If listing is still active,
    // add duration to current expiry.
    if (listing.expiresAt && new Date(listing.expiresAt) > now) {
      expiryDate = new Date(listing.expiresAt);
    } else {
      // If listing has already expired,
      // start from today.
      expiryDate = new Date();
    }

    expiryDate.setDate(expiryDate.getDate() + durationWeeks * 7);

    // ---------------------------------------------------------
    // Update listing
    // ---------------------------------------------------------

    listing.expiresAt = expiryDate;

    listing.listingDurationWeeks = durationWeeks;

    // IMPORTANT:
    // If the listing was expired/pending/etc.,
    // automatically approve it after successful payment.
    listing.status = "approved";

    await listing.save();

    // ---------------------------------------------------------
    // Credit transaction
    // ---------------------------------------------------------

    await createCreditTransaction({
      user: user._id,
      listing: listing._id,
      type: "listing_extend",
      credits: extensionCredits,
      balanceBefore,
      balanceAfter,
      description: `Credits used to extend listing for ${durationWeeks} ${
        durationWeeks === 1 ? "week" : "weeks"
      }`,
    });

    // ---------------------------------------------------------
    // Response
    // ---------------------------------------------------------

    return res.status(200).json({
      success: true,

      message: "Listing extended and approved successfully.",

      creditsUsed: extensionCredits,

      remainingCredits: user.wallet.credits,

      expiresAt: listing.expiresAt,

      status: listing.status,

      listing,
    });
  } catch (error) {
    console.error("Extend Listing Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * ============================================================
 * Search Listings
 * ============================================================
 *
 * Examples:
 *
 * Pune
 * Pune model
 * Pune model girls
 * Bangalore girls model
 * Mumbai model
 * Ranchi
 * beautiful model
 *
 * Every search word must match at least one searchable field.
 *
 * Example:
 *
 * "Pune model girls"
 *
 * means:
 *
 * Pune  -> must match
 * model -> must match
 * girls -> must match
 *
 * Each word can match title, name, city, category,
 * description, services, etc.
 */
exports.searchListings = async (req, res) => {
  try {
    let { q, page = 1, limit = 12, sort = "latest" } = req.query;

    // Validate search query
    if (!q || !q.trim()) {
      return res.status(400).json({
        success: false,
        message: "Search query is required.",
      });
    }

    const searchText = q.trim();

    // Prevent extremely long search query
    if (searchText.length > 100) {
      return res.status(400).json({
        success: false,
        message: "Search query is too long.",
      });
    }

    // Pagination
    page = Number(page);
    limit = Number(limit);

    if (Number.isNaN(page) || page < 1) {
      page = 1;
    }

    if (Number.isNaN(limit) || limit < 1) {
      limit = 12;
    }

    limit = Math.min(limit, 50);

    const skip = (page - 1) * limit;

    // Convert search into words
    const words = searchText.toLowerCase().split(/\s+/).filter(Boolean);

    // Escape regex characters
    const escapeRegex = (value) => {
      return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    };

    const escapedWords = words.map(escapeRegex);

    // Searchable fields
    const searchableFields = [
      "title",
      "name",
      "description",
      "category",
      "city",
      "state",
      "languages",
      "services",
      "bio",
    ];

    // Every word must match at least one field
    const wordConditions = escapedWords.map((word) => {
      return {
        $or: searchableFields.map((field) => ({
          [field]: {
            $regex: word,
            $options: "i",
          },
        })),
      };
    });

    // Base query
    const query = {
      status: "approved",
      expiresAt: {
        $gt: new Date(),
      },
      $and: wordConditions,
    };

    // Sorting
    let sortOption = {};

    switch (sort) {
      case "oldest":
        sortOption = {
          createdAt: 1,
        };
        break;

      case "priceLow":
        sortOption = {
          price: 1,
        };
        break;

      case "priceHigh":
        sortOption = {
          price: -1,
        };
        break;

      case "views":
        sortOption = {
          views: -1,
        };
        break;

      default:
        sortOption = {
          isPremium: -1,
          isFeatured: -1,
          isTrending: -1,
          createdAt: -1,
        };
    }

    // Count results
    const totalListings = await Listing.countDocuments(query);

    // Get listings
    const listings = await Listing.find(query)
      .populate("user", "name city state profileImage isEmailVerified")
      .sort(sortOption)
      .skip(skip)
      .limit(limit);

    return res.status(200).json({
      success: true,
      search: searchText,
      totalListings,
      currentPage: page,
      totalPages: Math.ceil(totalListings / limit),
      limit,
      listings,
    });
  } catch (error) {
    console.error("Search Listings Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
