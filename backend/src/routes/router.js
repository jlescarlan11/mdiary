// routes/router.js
const express = require("express");
const { controller } = require("../controllers/controller");
const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");

const router = express.Router();

// Existing routes
router.get("/", (req, res) => res.json("hello from backend"));
router.post("/api/auth/signup", controller.signup);
router.post("/api/auth/login", controller.login);
router.post("/api/admin/login", controller.adminLogin);

// Fixed movie creation route
router.post(
  "/api/movies", // Changed endpoint for better REST conventions
  authenticate,
  authorize("ADMIN"),
  controller.createMovie
);

router.get(
  "/api/genre",
  authenticate,
  authorize("ADMIN"),
  controller.getAllGenres
);

router.get(
  "/api/director",
  authenticate,
  authorize("ADMIN"),
  controller.getAllDirectors
);

module.exports = router;
