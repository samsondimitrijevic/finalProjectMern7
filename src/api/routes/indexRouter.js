const gamesRoutes = require("./games");
const plaformsRoutes = require("./platforms");
const usersRoutes = require("./users");

const indexRouter = require("express").Router();

indexRouter.use("/games", gamesRoutes);
indexRouter.use("/platforms", plaformsRoutes);
indexRouter.use("/users", usersRoutes);

module.exports = { indexRouter };
