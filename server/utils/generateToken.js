const jwt = require("jsonwebtoken");

/*
  Generate JWT token after successful login.
*/
const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

module.exports = generateToken;