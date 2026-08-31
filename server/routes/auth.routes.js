const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");
const { protect } = require("../middlewares/auth.middleware");
const upload = require("../middlewares/upload.middleware");

const {
  registerValidation,
  verifyOTPValidation,
  resendOTPValidation,
  forgotPasswordValidation,
  verifyResetOTPValidation,
} = require("../validations/auth.validation");

/*
|--------------------------------------------------------------------------
| Authentication Routes
|--------------------------------------------------------------------------
*/

// Register
router.post("/register", registerValidation, authController.register);

// Verify OTP
router.post("/verify-otp", verifyOTPValidation, authController.verifyOTP);

// Resend OTP
router.post("/resend-otp", resendOTPValidation, authController.resendOTP);

// Login
router.post("/login", authController.login);

// Forgot Password
router.post(
  "/forgot-password",
  forgotPasswordValidation,
  authController.forgotPassword,
);

// Verify Reset OTP
router.post(
  "/verify-reset-otp",
  verifyResetOTPValidation,
  authController.verifyResetOTP,
);

// Reset Password
router.post("/reset-password", authController.resetPassword);

// Change Password (Protected)
router.post("/change-password", protect, authController.changePassword);

// Get Profile (Protected)
router.get("/profile", protect, authController.getProfile);

// Update Profile (Protected + Image Upload)
router.put(
  "/profile",
  protect,
  upload.single("profileImage"),
  authController.updateProfile,
);

// Logout (Protected)
router.post("/logout", protect, authController.logout);

// Delete Account (Protected)
router.delete("/delete-account", protect, authController.deleteAccount);

module.exports = router;
