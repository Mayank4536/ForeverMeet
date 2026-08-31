const mongoose = require("mongoose");

const creditTransactionSchema = new mongoose.Schema(
  {
    /******************************
     * User
     ******************************/
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    /******************************
     * Listing (Optional)
     ******************************/
    listing: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Listing",
      default: null,
    },

    /******************************
     * Transaction Type
     ******************************/
    type: {
      type: String,
      enum: [
        "purchase",
        "listing_create",
        "listing_renew",
        "listing_extend",
        "admin_credit",
        "admin_debit",
        "refund",
      ],
      required: true,
    },

    /******************************
     * Credits
     ******************************/
    credits: {
      type: Number,
      required: true,
      min: 1,
    },

    /******************************
     * Balance
     ******************************/
    balanceBefore: {
      type: Number,
      required: true,
    },

    balanceAfter: {
      type: Number,
      required: true,
    },

    /******************************
     * Description
     ******************************/
    description: {
      type: String,
      default: "",
      trim: true,
    },

    /******************************
     * Payment Reference
     ******************************/
    paymentId: {
      type: String,
      default: "",
    },

    /******************************
     * Status
     ******************************/
    status: {
      type: String,
      enum: [
        "success",
        "failed",
        "pending",
      ],
      default: "success",
    },
  },
  {
    timestamps: true,
  }
);

/******************************
 * Indexes
 ******************************/

creditTransactionSchema.index({
  user: 1,
  createdAt: -1,
});

creditTransactionSchema.index({
  type: 1,
});

module.exports = mongoose.model(
  "CreditTransaction",
  creditTransactionSchema
);