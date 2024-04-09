const User = require("../api/model/user");
const { setError } = require("../config/error");
const { verifyToken } = require("../config/jwt");

const isAuthentificated = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    console.log(token);

    if (!token) {
      return next(setError(401, "You do not have permission"));
    }

    const parsedToken = token.replace("Bearer ", "");
    const isValidToken = verifyToken(parsedToken);
    const userLoggedIn = await User.findById(isValidToken.id);

    userLoggedIn.password = null;
    req.user = userLoggedIn;
    next();
  } catch (err) {
    return next(setError(401, err));
  }
};

module.exports = { isAuthentificated };
