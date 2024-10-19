const jwt = require('jsonwebtoken');

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: 7 * 24 * 60 * 60, // 7 days
  });
};

const varifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
    };

module.exports = { createToken, varifyToken };