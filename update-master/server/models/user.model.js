const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "please provide a username"],
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "please provide a email address"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Please enter password"],
      minlength: [8, "Password must be of minimum 6 characters"],
    },
    img: {
      type: String,
      required: false,
    },
    country: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      validate: {
        validator: function (value) {
          return String(value).length === 10;
        },
        message: "Please enter valid phone number",
      },
      required: [false, "please enter mobile number"],
    },
    desc: {
      type: String,
      required: false,
    },
    isSeller: {
      type: Boolean,
      default: false,
    },
    resetPasswordToken: String,
    resetPasswordExpiry: Date,
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10); // Hash the password before saving it to the database
  }
  next();
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.getResetPasswordToken = async function () {
  const resetToken = crypto.randomBytes(20).toString("hex"); // Generate a random token for resetting the password

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex"); // Hash the reset token and store it in the resetPasswordToken field
  this.resetPasswordExpiry = Date.now() + 15 * 60 * 1000; // Set the reset password token expiry to 15 minutes from the current time

  return resetToken; // Return the reset token to be used in the password reset process
};

userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password; // Remove the password field from the user object when converting it to JSON
  return user;
};
module.exports = mongoose.model("User", userSchema);
