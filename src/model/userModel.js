const mongoose = require('mongoose');
const { model, Schema } = mongoose;
const validator = require('validator');
const bcrypt = require('bcryptjs');

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

userSchema.pre("save", async function (next) {

  // if password is not modified, skip the hashing
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const User = model("User", userSchema);

module.exports = User;