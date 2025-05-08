const express = require("express");
const mdRouter = express.Router();
const { authenticateJWT } = require("../middleware/authMiddleware");
const mdController = require("../controllers/mdController");

mdRouter.post("/signup", mdController.signup);
mdRouter.post("/login", mdController.login);
mdRouter.get("/dashboard", authenticateJWT, mdController.dashboard);
mdRouter.get("/check-username", mdController.checkUsername);
mdRouter.get("/check-email", mdController.checkEmail);

module.exports = mdRouter;
