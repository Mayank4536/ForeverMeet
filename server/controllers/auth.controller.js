const User = require("../models/User");
const generateOTP = require("../utils/generateOTP");
const generateToken = require("../utils/generateToken");
const {
  sendOTPEmail,
  sendResetPasswordOTP,
} = require("../services/email.service");
const { validationResult } = require("express-validator");

/*
|--------------------------------------------------------------------------
| Register User
|--------------------------------------------------------------------------
*/
exports.register = async (req, res) => {
  try {
    // Check validation errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const { name, email, password } = req.body;

    // Check if email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already registered.",
      });
    }

    // Generate OTP
    const otp = generateOTP();

    // OTP expires after 10 minutes
    const otpExpire = new Date(Date.now() + 10 * 60 * 1000);

    // Create new user
    await User.create({
      name,
      email,
      password,
      emailOTP: otp,
      otpExpire,
    });

    // Send OTP email
    await sendOTPEmail(email, otp);

    res.status(201).json({
      success: true,
      message: "Registration successful. Please verify your email.",
    });
  } catch (error) {
    console.error("Register Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

/*
|--------------------------------------------------------------------------
| Verify Email OTP
|--------------------------------------------------------------------------
*/
exports.verifyOTP = async (req, res) => {
  try {
    // Check validation errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const { email, otp } = req.body;

    // Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // Already verified
    if (user.isEmailVerified) {
      return res.status(400).json({
        success: false,
        message: "Email already verified.",
      });
    }

    // OTP expired
    if (!user.otpExpire || user.otpExpire < new Date()) {
      return res.status(400).json({
        success: false,
        message: "OTP has expired.",
      });
    }

    // Wrong OTP
    if (user.emailOTP !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP.",
      });
    }

    // Update user
    user.isEmailVerified = true;
    user.emailOTP = null;
    user.otpExpire = null;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Email verified successfully.",
    });
  } catch (error) {
    console.error("Verify OTP Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

/*
|--------------------------------------------------------------------------
| Resend Email OTP
|--------------------------------------------------------------------------
*/

exports.resendOTP = async (req, res) => {
  try {
    // Validation errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const { email } = req.body;

    // Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // Already verified
    if (user.isEmailVerified) {
      return res.status(400).json({
        success: false,
        message: "Email is already verified.",
      });
    }

    // Generate new OTP
    const otp = generateOTP();

    user.emailOTP = otp;
    user.otpExpire = new Date(Date.now() + 10 * 60 * 1000);

    await user.save();

    // Send new OTP email
    await sendOTPEmail(user.email, otp);

    res.status(200).json({
      success: true,
      message: "New OTP sent successfully.",
    });
  } catch (error) {
    console.error("Resend OTP Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

/*
|--------------------------------------------------------------------------
| Login User
|--------------------------------------------------------------------------
*/
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check required fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    // Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // Email verification check
    if (!user.isEmailVerified) {
      return res.status(400).json({
        success: false,
        message: "Please verify your email first.",
      });
    }

    // Account blocked
    if (user.isBlocked) {
      return res.status(403).json({
        success: false,
        message: "Your account has been blocked.",
      });
    }

    // Compare password
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate JWT
    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: "Login successful.",
      token,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        wallet: user.wallet,
        city: user.city,
        state: user.state,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

/*
|--------------------------------------------------------------------------
| Forgot Password
|--------------------------------------------------------------------------
*/
exports.forgotPassword = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    if (!user.isEmailVerified) {
      return res.status(400).json({
        success: false,
        message: "Please verify your email first.",
      });
    }

    const otp = generateOTP();

    user.resetOTP = otp;
    user.resetOTPExpire = new Date(Date.now() + 10 * 60 * 1000);

    await user.save();

    await sendResetPasswordOTP(user.email, otp);

    res.status(200).json({
      success: true,
      message: "Password reset OTP sent successfully.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

/*
|--------------------------------------------------------------------------
| Verify Password Reset OTP
|--------------------------------------------------------------------------
*/
exports.verifyResetOTP = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    if (!user.resetOTP) {
      return res.status(400).json({
        success: false,
        message: "No reset request found.",
      });
    }

    if (user.resetOTPExpire < new Date()) {
      return res.status(400).json({
        success: false,
        message: "OTP has expired.",
      });
    }

    if (user.resetOTP !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP.",
      });
    }

    res.status(200).json({
      success: true,
      message: "OTP verified successfully.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

/*
|--------------------------------------------------------------------------
| Reset Password
|--------------------------------------------------------------------------
*/
exports.resetPassword = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const { email, otp, newPassword } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    console.log("OTP from request:", otp);
    console.log("OTP in database:", user.resetOTP);

    if (!user.resetOTP) {
      return res.status(400).json({
        success: false,
        message: "No reset request found.",
      });
    }

    if (user.resetOTP !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP.",
      });
    }

    if (user.resetOTPExpire < new Date()) {
      return res.status(400).json({
        success: false,
        message: "OTP expired.",
      });
    }

    user.password = newPassword;

    user.resetOTP = null;
    user.resetOTPExpire = null;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password reset successfully.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

/*
|--------------------------------------------------------------------------
| Change Password
|--------------------------------------------------------------------------
*/
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // Check current password
    const isMatch = await user.matchPassword(currentPassword);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Current password is incorrect.",
      });
    }

    // Update password
    user.password = newPassword;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password changed successfully.",
    });
  } catch (error) {
    console.error("Change Password Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

/*
|--------------------------------------------------------------------------
| Get Logged In User Profile
|--------------------------------------------------------------------------
*/
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Get Profile Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

/*
|--------------------------------------------------------------------------
| Update Profile
|--------------------------------------------------------------------------
*/
const cloudinary = require("../config/cloudinary");

exports.updateProfile = async (req, res) => {
  try {
    const { name, phone, city, state, removeProfileImage } = req.body;

    console.log("========== UPDATE PROFILE ==========");
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    // Find logged-in user
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // ==========================================
    // UPDATE BASIC INFORMATION
    // ==========================================

    if (name !== undefined) {
      user.name = name.trim();
    }

    if (phone !== undefined) {
      user.phone = phone.trim();
    }

    if (city !== undefined) {
      user.city = city.trim();
    }

    if (state !== undefined) {
      user.state = state.trim();
    }

    // ==========================================
    // REMOVE EXISTING PROFILE IMAGE
    // ==========================================

    if (removeProfileImage === "true" && !req.file) {
      if (user.profileImage?.publicId) {
        await cloudinary.uploader.destroy(user.profileImage.publicId);
      }

      user.profileImage = {
        url: "",
        publicId: "",
      };
    }

    // ==========================================
    // UPLOAD NEW PROFILE IMAGE
    // ==========================================

    if (req.file) {
      // Delete old Cloudinary image first
      if (user.profileImage?.publicId) {
        await cloudinary.uploader.destroy(user.profileImage.publicId);
      }

      user.profileImage = {
        url: req.file.path,
        publicId: req.file.filename,
      };
    }

    // ==========================================
    // SAVE USER
    // ==========================================

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      user,
    });
  } catch (error) {
    console.error("========== UPDATE PROFILE ERROR ==========");

    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
|--------------------------------------------------------------------------
| Logout User
|--------------------------------------------------------------------------
*/
exports.logout = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "Logged out successfully.",
    });
  } catch (error) {
    console.error("Logout Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

/*
|--------------------------------------------------------------------------
| Delete Account
|--------------------------------------------------------------------------
*/
exports.deleteAccount = async (req, res) => {
  try {
    const { password } = req.body;

    // Find logged-in user
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // Password required
    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Password is required.",
      });
    }

    // Verify password
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect password.",
      });
    }

    // Delete account
    await User.findByIdAndDelete(user._id);

    res.status(200).json({
      success: true,
      message: "Account deleted successfully.",
    });
  } catch (error) {
    console.error("Delete Account Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
