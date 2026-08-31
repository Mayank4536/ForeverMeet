const express = require("express");
const router = express.Router();

const { protect } = require("../middlewares/auth.middleware");
const walletController = require("../controllers/wallet.controller");

// Create Razorpay Order
router.post(
  "/create-order",
  protect,
  walletController.createOrder
);

// Verify Razorpay Payment
router.post(
  "/verify-payment",
  protect,
  walletController.verifyPayment
);


// Get Wallet
router.get(
  "/",
  protect,
  walletController.getWallet
);

// Get Wallet Transactions
router.get(
  "/transactions",
  protect,
  walletController.getTransactions
);

// Get Wallet Transaction by ID
router.get(
  "/transactions/:id",
  protect,
  walletController.getTransactionById
);

module.exports = router;