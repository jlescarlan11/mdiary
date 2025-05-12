// routes/router.js
const express = require("express");
const { controller } = require("../controllers/controller");
const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");

const router = express.Router();

// Public routes
router.get("/", (req, res) => res.json("hello from backend"));
router.post("/api/auth/signup", controller.signup);
router.post("/api/auth/login", controller.login);

// Admin routes - grouped and protected by authentication and authorization middleware
const adminRouter = express.Router();
adminRouter.use(authenticate, authorize("ADMIN")); // Apply middleware to all admin routes

adminRouter.post("/login", controller.adminLogin); // Specific admin login endpoint

// Movie Management Routes
adminRouter.post("/movies", controller.createMovie); // Create movie (admin only)
adminRouter.get("/movies", controller.getMovies); // Get all movies with search/pagination/sorting (admin only)
adminRouter.get("/movies/:movieId", controller.getMovieById); // Get a single movie by ID (admin only)
adminRouter.patch("/movies/:movieId", controller.updateMovie); // Update movie (admin only)
adminRouter.delete("/movies/:movieId", controller.deleteMovie); // Delete movie (admin only)

adminRouter.get("/genre", controller.getAllGenres); // Get all genres (admin only)
adminRouter.get("/director", controller.getAllDirectors); // Get all directors (admin only)
adminRouter.get("/dashboard", controller.getCombinedDashboardData); // Get dashboard data (admin only)

// Admin User Management Routes
adminRouter.get("/users", controller.getUsers); // Get all users with search/pagination
adminRouter.patch("/users/:userId", controller.updateUserRole); // Update user role
adminRouter.delete("/users/:userId", controller.deleteUser); // Delete user

// Mount the admin router
router.use("/api/admin", adminRouter);

module.exports = router;
