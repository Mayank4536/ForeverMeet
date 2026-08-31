const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    /******************************
     * Basic Information
     ******************************/
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      default: "",
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    /******************************
     * Profile Information
     ******************************/
    profileImage: {
      url: {
        type: String,
        default: "",
      },
      publicId: {
        type: String,
        default: "",
      },
    },

    city: {
      type: String,
      default: "",
    },

    state: {
      type: String,
      default: "",
    },

    /******************************
     * User Role
     ******************************/
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    /******************************
     * Wallet (Credits System)
     ******************************/
    wallet: {
      credits: {
        type: Number,
        default: 0,
      },

      totalPurchased: {
        type: Number,
        default: 0,
      },

      totalSpent: {
        type: Number,
        default: 0,
      },
    },

    /******************************
     * Email Verification
     ******************************/
    isEmailVerified: {
      type: Boolean,
      default: false,
    },

    emailOTP: {
      type: String,
      default: null,
    },

    otpExpire: {
      type: Date,
      default: null,
    },

    /******************************
     * Password Reset OTP
     ******************************/
    resetOTP: {
      type: String,
      default: null,
    },

    resetOTPExpire: {
      type: Date,
      default: null,
    },


    /******************************
     * Account Status
     ******************************/
    isBlocked: {
      type: Boolean,
      default: false,
    },

    lastLogin: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

/*
|--------------------------------------------------------------------------
| Hash password before saving
|--------------------------------------------------------------------------
| Password is hashed only when it has been modified.
*/
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

/*
|--------------------------------------------------------------------------
| Compare entered password with stored password
|--------------------------------------------------------------------------
*/
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
