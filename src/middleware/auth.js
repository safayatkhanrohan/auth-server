
const User = require("../model/userModel");
const { varifyToken } = require("../helper/jwt");

exports.isAuthenticated = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Please log in" });
    }
    try {
        const decoded = varifyToken(token);
        const user = await User.findById(decoded.id);
        req.user = user;
    }

    catch (error) {
        return res.status(500).json({ message: error.message });
    }
    next();
}