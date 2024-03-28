const {
  getAllPlatforms,
  getPlatformById,
  createPlatform,
  updatePlatform,
  deletePlatform,
} = require("../controller/platforms");
const { isAuthentificated } = require("../../middlewares/auth");

const platformsRoutes = require("express").Router();

platformsRoutes.get("/", getAllPlatforms);
platformsRoutes.get("/:id", getPlatformById);
platformsRoutes.post("/", [isAuthentificated], createPlatform);
platformsRoutes.put("/:id", [isAuthentificated], updatePlatform);
platformsRoutes.delete("/:id", [isAuthentificated], deletePlatform);

module.exports = platformsRoutes;
