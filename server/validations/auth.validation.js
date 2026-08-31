const { body } = require("express-validator");

/*
|--------------------------------------------------------------------------
| Register Validation
|--------------------------------------------------------------------------
*/
exports.registerValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2 })
    .withMessage("Name must be at least 2 characters"),

  body("email")
    .isEmail()
    .withMessage("Please enter a valid email")
    .normalizeEmail(),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

/*
|--------------------------------------------------------------------------
| Verify OTP Validation
|--------------------------------------------------------------------------
*/
exports.verifyOTPValidation = [
  body("email")
    .isEmail()
    .withMessage("Please enter a valid email")
    .normalizeEmail(),

  body("otp")
    .notEmpty()
    .withMessage("OTP is required")
    .isLength({ min: 6, max: 6 })
    .withMessage("OTP must be 6 digits"),
];

/*
|--------------------------------------------------------------------------
| Resend OTP Validation
|--------------------------------------------------------------------------
*/
exports.resendOTPValidation = [
  body("email")
    .isEmail()
    .withMessage("Please enter a valid email")
    .normalizeEmail(),
];

/*
|--------------------------------------------------------------------------
| Forgot Password Validation
|--------------------------------------------------------------------------
*/
exports.forgotPasswordValidation = [
  body("email")
    .isEmail()
    .withMessage("Please enter a valid email")
    .normalizeEmail(),
];

/*
|--------------------------------------------------------------------------
| Verify Reset OTP Validation
|--------------------------------------------------------------------------
*/
exports.verifyResetOTPValidation = [
  body("email")
    .isEmail()
    .withMessage("Valid email required"),

  body("otp")
    .notEmpty()
    .withMessage("OTP is required"),
];