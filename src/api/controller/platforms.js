const Platform = require("../model/platforms");
const { setError } = require("../../config/error");

// POST  (create)
const createPlatform = async (req, res, next) => {
  try {
    const PlatformExists = await Platform.findOne({ name: req.body.name });
    if (PlatformExists) {
      return res.status(400).json("Platform already exists");
    } else {
      const newPlatform = new Platform(req.body);
      const platformDB = await newPlatform.save();
      return res.status(201).json(platformDB);
    }
  } catch (err) {
    return next(setError(400, err));
  }
};

// GET (read)
const getAllPlatforms = async (req, res, next) => {
  try {
    const allPlatforms = await Platform.find().populate("games", "title stock");
    return res.status(201).json(allPlatforms);
  } catch (err) {
    return next(setError(400, err));
  }
};

// GET (read)
const getPlatformById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const platform = await Platform.findById(id).populate("games");
    return res.status(201).json(platform);
  } catch (err) {
    return next(setError(400, err));
  }
};

// PUT(update)
const updatePlatform = async (req, res, next) => {
  try {
    const { id } = req.params;
    const oldPlatform = await Platform.findById(id);
    const newPlatform = new Platform(req.body);
    newPlatform._id = id;

    if (newPlatform.games) {
      const uniqueSet = new Set([...oldPlatform.games, ...newPlatform.games]);
      newPlatform.games = Array.from(uniqueSet);
    }

    const platformUpdated = await Platform.findByIdAndUpdate(id, newPlatform, {
      new: true,
    });

    return res.status(200).json(platformUpdated);
  } catch (err) {
    return next(setError(400, err));
  }
};

// DELETE (delete)
const deletePlatform = async (req, res, next) => {
  try {
    const { id } = req.params;
    const platform = await Platform.findByIdAndDelete(id);
    return res.status(201).json({
      confirmation: "Platform deleted successfully!",
      DeletedPlatform: platform,
    });
  } catch (err) {
    return next(setError(400, err));
  }
};

module.exports = {
  getAllPlatforms,
  getPlatformById,
  createPlatform,
  deletePlatform,
  updatePlatform,
};
