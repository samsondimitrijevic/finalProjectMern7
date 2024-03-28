const { register, login } = require("../controller/users");
const { isAuthentificated } = require("../../middlewares/auth");

const usersRoutes = require("express").Router();

usersRoutes.post("/register", [isAuthentificated], register);
usersRoutes.post("/login", login);

module.exports = usersRoutes;
