const {
  getAllGames,
  getGameById,
  createGame,
  updateGame,
  deleteGame,
} = require("../controller/games");
const { isAuthentificated } = require("../../middlewares/auth");
const uploadFile = require("../../middlewares/uploadFile");

const gamesRoutes = require("express").Router();

gamesRoutes.get("/", getAllGames);
gamesRoutes.get("/:id", getGameById);
gamesRoutes.post(
  "/",
  [isAuthentificated],
  uploadFile.single("image"),
  createGame
);
gamesRoutes.put(
  "/:id",
  [isAuthentificated],
  uploadFile.single("image"),
  updateGame
);
gamesRoutes.delete("/:id", [isAuthentificated], deleteGame);

module.exports = gamesRoutes;
