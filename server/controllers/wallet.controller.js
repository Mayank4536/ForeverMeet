const crypto = require("crypto");
const Razorpay = require("../config/razorpay");
const User = require("../models/User");
const CreditTransaction = require("../models/CreditTransaction");
const WalletOrder = require("../models/WalletOrder");

/*
|--------------------------------------------------------------------------
| Get Wallet
|--------------------------------------------------------------------------
*/
exports.getWallet = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("wallet");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    return res.status(200).json({
      success: true,
      wallet: user.wallet,
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
| Get Wallet Transactions
|--------------------------------------------------------------------------
*/
exports.getTransactions = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const transactions = await CreditTransaction.find({
      user: req.user._id,
    })
      .populate("listing", "title slug")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalTransactions = await CreditTransaction.countDocuments({
      user: req.user._id,
    });

    return res.status(200).json({
      success: true,
      totalTransactions,
      currentPage: page,
      totalPages: Math.ceil(totalTransactions / limit),
      transactions,
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
| Get Single Transaction
|--------------------------------------------------------------------------
*/
exports.getTransactionById = async (req, res) => {
  try {
    const { id } = req.params;

    const transaction = await CreditTransaction.findOne({
      _id: id,
      user: req.user._id,
    }).populate(
      "listing",
      "title slug city category images expiresAt",
    );

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found.",
      });
    }

    return res.status(200).json({
      success: true,
      transaction,
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
| Create Razorpay Order
|--------------------------------------------------------------------------
*/
exports.createOrder = async (req, res) => {
  try {
    const { credits } = req.body;

    const packages = {
      100: 500,
      250: 1000,
      500: 1800,
      1000: 3000,
    };

    if (!packages[credits]) {
      return res.status(400).json({
        success: false,
        message: "Invalid credit package.",
      });
    }

    const amount = packages[credits];

    const receipt = `credits_${Date.now()}`;

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt,
    };

    // Create order on Razorpay
    const order = await Razorpay.orders.create(options);

    // Save order in our database
    const walletOrder = await WalletOrder.create({
      user: req.user._id,
      razorpayOrderId: order.id,
      credits,
      amount,
      currency: "INR",
      receipt,
      status: "pending",
    });

    return res.status(200).json({
      success: true,
      order: {
        id: order.id,
        amount: order.amount,
        currency: order.currency,
        receipt: order.receipt,
        status: order.status,
      },
      walletOrderId: walletOrder._id,
      credits,
      amount,
    });
  } catch (error) {
    console.log("Create Order Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
|--------------------------------------------------------------------------
| Verify Razorpay Payment
|--------------------------------------------------------------------------
*/
exports.verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
    } = req.body;

    // Check required Razorpay response
    if (
      !razorpay_payment_id ||
      !razorpay_order_id ||
      !razorpay_signature
    ) {
      return res.status(400).json({
        success: false,
        message: "Payment verification details are required.",
      });
    }

    // Find our wallet order
    const walletOrder = await WalletOrder.findOne({
      razorpayOrderId: razorpay_order_id,
      user: req.user._id,
    });

    if (!walletOrder) {
      return res.status(404).json({
        success: false,
        message: "Wallet order not found.",
      });
    }

    // Prevent duplicate credit
    if (walletOrder.status === "paid") {
      return res.status(400).json({
        success: false,
        message: "This payment has already been processed.",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | Verify Razorpay Signature
    |--------------------------------------------------------------------------
    */
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(
        `${walletOrder.razorpayOrderId}|${razorpay_payment_id}`
      )
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      walletOrder.status = "failed";
      await walletOrder.save();

      return res.status(400).json({
        success: false,
        message: "Invalid payment signature.",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | Fetch Payment From Razorpay
    |--------------------------------------------------------------------------
    */
    const payment = await Razorpay.payments.fetch(
      razorpay_payment_id
    );

    // Make sure payment belongs to our order
    if (payment.order_id !== walletOrder.razorpayOrderId) {
      return res.status(400).json({
        success: false,
        message: "Payment does not belong to this order.",
      });
    }

    // Verify amount
    if (payment.amount !== walletOrder.amount * 100) {
      return res.status(400).json({
        success: false,
        message: "Payment amount does not match order amount.",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | Payment must be captured
    |--------------------------------------------------------------------------
    */
    if (payment.status !== "captured") {
      return res.status(400).json({
        success: false,
        message: `Payment is not captured. Current status: ${payment.status}`,
      });
    }

    /*
    |--------------------------------------------------------------------------
    | Find User
    |--------------------------------------------------------------------------
    */
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | Add Credits
    |--------------------------------------------------------------------------
    */
    const balanceBefore = user.wallet.credits;

    user.wallet.credits += walletOrder.credits;
    user.wallet.totalPurchased += walletOrder.credits;

    await user.save();

    const balanceAfter = user.wallet.credits;

    /*
    |--------------------------------------------------------------------------
    | Update Wallet Order
    |--------------------------------------------------------------------------
    */
    walletOrder.razorpayPaymentId = razorpay_payment_id;
    walletOrder.razorpaySignature = razorpay_signature;
    walletOrder.status = "paid";

    await walletOrder.save();

    /*
    |--------------------------------------------------------------------------
    | Create Credit Transaction
    |--------------------------------------------------------------------------
    */
    await CreditTransaction.create({
      user: user._id,
      type: "purchase",
      credits: walletOrder.credits,
      balanceBefore,
      balanceAfter,
      description: `Purchased ${walletOrder.credits} credits`,
      paymentId: razorpay_payment_id,
      status: "success",
    });

    return res.status(200).json({
      success: true,
      message: "Payment verified and credits added successfully.",
      paymentId: razorpay_payment_id,
      creditsAdded: walletOrder.credits,
      remainingCredits: user.wallet.credits,
      walletOrderId: walletOrder._id,
    });
  } catch (error) {
    console.error("Razorpay Verification Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};