const { createToken } = require("../helper/jwt");
const User = require("../model/userModel");
const bcrypt = require("bcryptjs");

// sign up user => /singup
exports.signUp = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    res
      .status(201)
      .json({ success: true, message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// sign in user => /signin
// sign in user => /signin
exports.signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = createToken(user._id);

    const cookieOptions = {
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      httpOnly: true,
      secure: true,
    };

    return res.status(200).cookie("token", token, cookieOptions).json({
      success: true,
      message: "User signed in successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// get user profile => /profile

exports.getUserProfile = async (req, res) => {
  res.json({ sucess: true, user: req.user });
};

// log out user => /logout
exports.logOut = async (req, res) => {
  res
    .clearCookie("token")
    .json({ success: true, message: "Logged out successfully" });
};
