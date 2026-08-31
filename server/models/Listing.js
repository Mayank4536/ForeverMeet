const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema(
  {
    /******************************
     * Basic Information
     ******************************/
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },

    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 3000,
    },

    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 60,
    },

    age: {
      type: Number,
      required: true,
      min: 18,
      max: 99,
    },

    height: {
      type: String,
      required: true,
      trim: true,
    },

    weight: {
      type: String,
      required: true,
      trim: true,
    },

    bio: {
      type: String,
      default: "",
      maxlength: 1500,
    },

    /******************************
     * Category
     ******************************/
    category: {
      type: String,
      required: true,
      trim: true,
    },

    city: {
      type: String,
      required: true,
      trim: true,
    },

    state: {
      type: String,
      required: true,
      trim: true,
    },

    /******************************
     * Contact
     ******************************/
    phone: {
      type: String,
      required: true,
      trim: true,
    },

    whatsapp: {
      type: String,
      default: "",
      trim: true,
    },

    /******************************
     * Pricing
     ******************************/
    price: {
      type: Number,
      required: true,
      min: 0,
    },

    /******************************
     * Languages
     ******************************/
    languages: [
      {
        type: String,
      },
    ],

    /******************************
     * Services
     ******************************/
    services: [
      {
        type: String,
      },
    ],

    /******************************
     * Images
     ******************************/
    images: [
      {
        url: {
          type: String,
          required: true,
        },

        publicId: {
          type: String,
          required: true,
        },
      },
    ],

    /******************************
     * Status
     ******************************/
    status: {
      type: String,
      enum: ["approved", "expired", "rejected", "pending"],
      default: "approved",
    },

    /******************************
     * Premium Features
     ******************************/
    isPremium: {
      type: Boolean,
      default: false,
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    isTrending: {
      type: Boolean,
      default: false,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    isHomepageHighlight: {
      type: Boolean,
      default: false,
    },

    isUrgent: {
      type: Boolean,
      default: false,
    },

    isTopCity: {
      type: Boolean,
      default: false,
    },

    /******************************
     * Duration
     ******************************/
    listingDurationWeeks: {
      type: Number,
      default: 1,
    },

    expiresAt: Date,

    /******************************
     * Statistics
     ******************************/
    views: {
      type: Number,
      default: 0,
    },

    favorites: {
      type: Number,
      default: 0,
    },

    /******************************
     * SEO
     ******************************/
    slug: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
    },

    /******************************
     * Owner
     ******************************/
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

/************************************************
 * INDEXES (Only Once)
 ************************************************/

listingSchema.index({ city: 1 });

listingSchema.index({ category: 1 });

listingSchema.index({ isPremium: 1 });

listingSchema.index({ isFeatured: 1 });

listingSchema.index({ isTrending: 1 });

listingSchema.index({ createdAt: -1 });

listingSchema.index({
  title: "text",
  description: "text",
  name: "text",
});

listingSchema.index({
  isPremium: -1,
  isFeatured: -1,
  isTrending: -1,
});

listingSchema.index({
  expiresAt: 1,
});

module.exports = mongoose.model("Listing", listingSchema);
