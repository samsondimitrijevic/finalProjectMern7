const User = require("../model/user");
const { setError } = require("../../config/error");
const { hashPassword, verifyPassword } = require("../../config/password");
const { generateToken } = require("../../config/jwt");

const register = async (req, res, next) => {
  try {
    const { userName, password } = req.body;
    const hash = await hashPassword(password);
    const newUser = new User({ userName, password: hash });

    const userExists = await User.findOne({ userName });

    if (userExists) {
      return next(setError(400, "This user already exists "));
    }
    const user = await newUser.save();
    return res.status(201).json(user);
  } catch (error) {
    return next(setError(400, "Can't register user"));
  }
};

const login = async (req, res, next) => {
  try {
    const { userName, password } = req.body;
    const user = await User.findOne({ userName }).lean();

    if (!user) {
      return next(setError(401, "Incorrect login credentials"));
    }

    const isValidPassword = await verifyPassword(password, user.password);
    if (!isValidPassword) {
      return next(setError(401, "Incorrect login credentials"));
    } else {
      const token = generateToken({ id: user._id });
      const { password: userPassword, ...restUser } = user;
      return res.status(200).json({ data: { token, user: restUser } });
    }
  } catch (err) {
    return next(setError(400, err));
  }
};

module.exports = { register, login };
