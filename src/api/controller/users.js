const User = require("../model/user");
const { setError } = require("../../config/error");
const { hashPassword, verifyPassword } = require("../../config/password");
const { generateToken } = require("../../config/jwt");

const register = async (req, res, next) => {
  try {
    const { userName, password } = req.body;

    // Specific password required for registration
    const specificPassword = "Qw60$gofsam24";

    // Check if the provided password matches the specific password
    if (password !== specificPassword) {
      return res.status(400).json({
        error: "Incorrect password. Please provide the specific password.",
      });
    }

    // Hash the password
    const hash = await hashPassword(password);

    // Create a new user with the hashed password
    const newUser = new User({ userName, password: hash });

    // Check if the user already exists
    const userExists = await User.findOne({ userName });

    if (userExists) {
      return res.status(400).json({ error: "This user already exists." });
    }

    // Save the new user
    const user = await newUser.save();

    // Return the user object
    return res.status(201).json(user);
  } catch (error) {
    // Handle any errors
    return res.status(400).json({ error: "Can't register user." });
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
