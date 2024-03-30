const jwt = require("jsonwebtoken");

const tokenTimeout = "1hr";

const generateToken = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: tokenTimeout,
  });
  return token;
};

const verifyToken = (token) => {
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    return payload;
  } catch (err) {
    console.error(err);
    throw new Error("Invalid or expired token");
  }
};

module.exports = {
  verifyToken,
  generateToken,
};
