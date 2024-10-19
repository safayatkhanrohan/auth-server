const mongoose = require('mongoose');
const { model, Schema } = mongoose;
const validator = require('validator');

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    validate: [validator.isEmail, "Please enter a valid email address"],
  },
  password: {
    type: String,
    required: true,
    minLength: [6, "Password must be at least 6 characters long"],
    select: false,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.index({ email: 1 }, { unique: true });

const User = model("User", userSchema);

// Ensure indexes are applied (important to prevent duplicate emails)
User.createIndexes().catch((err) =>
  console.error("Index creation failed:", err)
);

module.exports = User;