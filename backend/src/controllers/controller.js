const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const query = require("../utils/query"); // Assuming query.js contains functions for user, genre, director, movie, adminDashboard
const { PrismaClient } = require("../../generated/prisma");
const prisma = new PrismaClient();

// Helper to sign a JWT
function generateToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: "2d",
    }
  );
}

const controller = {
  signup: async (req, res) => {
    const { username, email, password, inviteCode } = req.body;

    try {
      // Check if user with the email already exists using the query helper
      if (await query.user.getByEmail(email)) {
        return res.status(409).json({ message: "Email already exists." });
      }

      // Determine if the user is an admin based on the invite code
      const isAdmin = inviteCode === process.env.ADMIN_INVITE_CODE;

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create the new user using the query helper
      const newUser = await query.user.create(
        username,
        email,
        hashedPassword,
        isAdmin
      );

      // Generate JWT token for the new user
      const token = generateToken({
        id: newUser.id,
        email: newUser.email,
        role: newUser.role,
      });

      // Respond with success status, token, and user details
      res.status(201).json({
        token,
        user: {
          id: newUser.id,
          username: newUser.username,
          email: newUser.email,
          role: newUser.role,
        },
      });
    } catch (err) {
      // Log the full error internally but return a generic message to the client
      console.error("Signup error:", err);
      res.status(500).json({ error: "An error occurred during signup." });
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      // Find user by email using the query helper
      const user = await query.user.getByEmail(email);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Compare provided password with hashed password
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // Generate token for the logged-in user
      const token = generateToken(user);

      // Respond with success message, user details, and token
      res.status(200).json({
        message: "Login successful",
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role, // Include role in login response
        },
        token,
      });
    } catch (err) {
      // Log the full error internally
      console.error("Login error:", err);
      res.status(500).json({ error: "An error occurred during login." });
    }
  },

  adminLogin: async (req, res) => {
    const { email, password } = req.body;

    try {
      // Find user by email using the query helper
      const user = await query.user.getByEmail(email);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Additional admin role check
      if (user.role !== "ADMIN") {
        return res.status(403).json({ error: "Admin access required" });
      }

      // Compare provided password with hashed password
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // Generate token for the admin user
      const token = generateToken(user);

      // Respond with success message, admin user details, and token
      res.status(200).json({
        message: "Admin login successful",
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
        token,
      });
    } catch (err) {
      // Log the full error internally
      console.error("Admin login error:", err);
      res.status(500).json({ error: "An error occurred during admin login." });
    }
  },

  createMovie: async (req, res) => {
    try {
      const {
        title,
        year,
        duration,
        description,
        posterUrl,
        genres = [], // Default to empty array if not provided
        directors = [], // Default to empty array if not provided
      } = req.body;

      // Basic validation for required fields
      if (!title || !year || !duration || !description || !posterUrl) {
        return res.status(400).json({
          error:
            "All required fields (title, year, duration, description, posterUrl) must be provided",
        });
      }

      // Basic validation for genres and directors array structure
      if (!Array.isArray(genres) || !Array.isArray(directors)) {
        return res.status(400).json({
          error: "Genres and Directors must be provided as arrays.",
        });
      }

      // Further validation for director objects
      for (const director of directors) {
        if (
          typeof director !== "object" ||
          !director.firstName ||
          !director.lastName
        ) {
          return res.status(400).json({
            error: "Each director must have 'firstName' and 'lastName'.",
          });
        }
      }

      // Create the movie in the database using Prisma client directly
      const movie = await prisma.movie.create({
        data: {
          title,
          year: parseInt(year), // Ensure year is an integer
          duration: parseInt(duration), // Ensure duration is an integer
          description,
          posterUrl,
          // Connect or create genres based on provided names
          genres: {
            create: genres.map((name) => ({
              genre: {
                connectOrCreate: {
                  where: { name },
                  create: { name },
                },
              },
            })),
          },
          // Connect or create directors based on provided first and last names
          directors: {
            create: directors.map(({ firstName, lastName }) => ({
              director: {
                connectOrCreate: {
                  where: {
                    firstName_lastName: {
                      firstName,
                      lastName,
                    },
                  },
                  create: { firstName, lastName },
                },
              },
            })),
          },
        },
        // Include related genres and directors in the response
        include: {
          genres: { include: { genre: true } },
          directors: { include: { director: true } },
        },
      });

      // Respond with the created movie object
      res.status(201).json(movie);
    } catch (error) {
      // Log the full error internally
      console.error("Error creating movie:", error);

      // Handle specific Prisma errors
      if (error.code === "P2002") {
        // Unique constraint violation
        return res
          .status(400)
          .json({ error: "Movie with this title already exists" });
      }
      if (error.code === "P2003") {
        // Foreign key constraint violation (less likely here, but good to include)
        return res.status(400).json({
          error:
            "Invalid data format provided (e.g., non-existent genre/director ID if not using connectOrCreate)",
        });
      }

      // Handle other potential server errors
      res
        .status(500)
        .json({ error: "An error occurred during movie creation." });
    }
  },

  // New Controller function to get movies with search, pagination, and sorting
  getMovies: async (req, res) => {
    const { search, page, limit, sortColumn, sortDirection } = req.query;
    console.log("Debug: Accessing getMovies controller"); // Debug log
    console.log("Debug: query object:", query); // Debug log
    console.log("Debug: query.movie object:", query.movie); // Debug log
    try {
      const { movies, totalMovies } = await query.movie.getMovies(
        search,
        parseInt(page) || 1, // Default to page 1
        parseInt(limit) || 10, // Default to 10 items per page
        sortColumn,
        sortDirection
      );
      res.status(200).json({ movies, totalMovies });
    } catch (error) {
      console.error("Error in controller fetching movies:", error);
      res
        .status(500)
        .json({ error: "An error occurred while fetching movies." });
    }
  },

  // New Controller function to get a single movie by ID
  getMovieById: async (req, res) => {
    const { movieId } = req.params;
    try {
      const movie = await query.movie.getMovieById(movieId);
      if (!movie) {
        return res.status(404).json({ error: "Movie not found." });
      }
      res.status(200).json(movie);
    } catch (error) {
      console.error("Error in controller fetching movie by ID:", error);
      res
        .status(500)
        .json({ error: "An error occurred while fetching the movie." });
    }
  },

  // New Controller function to update a movie
  updateMovie: async (req, res) => {
    const { movieId } = req.params;
    const {
      title,
      year,
      duration,
      description,
      posterUrl,
      genres = [],
      directors = [],
    } = req.body;

    // Basic validation for required fields
    if (!title || !year || !duration || !description || !posterUrl) {
      return res.status(400).json({
        error:
          "All required fields (title, year, duration, description, posterUrl) must be provided",
      });
    }

    // Basic validation for genres and directors array structure
    if (!Array.isArray(genres) || !Array.isArray(directors)) {
      return res.status(400).json({
        error: "Genres and Directors must be provided as arrays.",
      });
    }

    // Further validation for director objects
    for (const director of directors) {
      if (
        typeof director !== "object" ||
        !director.firstName ||
        !director.lastName
      ) {
        return res.status(400).json({
          error: "Each director must have 'firstName' and 'lastName'.",
        });
      }
    }

    try {
      const updatedMovie = await query.movie.updateMovie(movieId, {
        title,
        year: parseInt(year),
        duration: parseInt(duration),
        description,
        posterUrl,
        genres,
        directors,
      });
      res.status(200).json(updatedMovie);
    } catch (error) {
      console.error("Error in controller updating movie:", error);
      // Check if the error is due to movie not found
      if (error.code === "P2025") {
        return res.status(404).json({ error: "Movie not found." });
      }
      res
        .status(500)
        .json({ error: "An error occurred while updating the movie." });
    }
  },

  // New Controller function to delete a movie
  deleteMovie: async (req, res) => {
    const { movieId } = req.params;
    try {
      await query.movie.deleteMovie(movieId);
      res.status(200).json({ message: "Movie deleted successfully." });
    } catch (error) {
      console.error("Error in controller deleting movie:", error);
      // Check if the error is due to movie not found
      if (error.code === "P2025") {
        return res.status(404).json({ error: "Movie not found." });
      }
      res
        .status(500)
        .json({ error: "An error occurred while deleting the movie." });
    }
  },

  getAllGenres: async (req, res) => {
    try {
      // Fetch all genres using the query helper
      const genres = await query.genre.getAll();
      res.status(200).json(genres);
    } catch (err) {
      console.error("Error fetching genres:", err);
      res.status(500).json({ error: "An error occurred fetching genres." });
    }
  },

  getAllDirectors: async (req, res) => {
    try {
      // Fetch all directors using the query helper
      const directors = await query.director.getAll();
      res.status(200).json(directors);
    } catch (err) {
      console.error("Error fetching directors:", err);
      res.status(500).json({ error: "An error occurred fetching directors." });
    }
  },

  getCombinedDashboardData: async (req, res) => {
    const { startDate, endDate } = req.query;

    // Validate date parameters
    if (!startDate || !endDate) {
      return res.status(400).json({
        error: "Both startDate and endDate (YYYY-MM-DD) are required.",
      });
    }

    try {
      // Parse dates - Add basic validation to ensure they are valid dates
      const start = new Date(startDate);
      const end = new Date(endDate);

      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        return res.status(400).json({
          error: "Invalid date format. Please use YYYY-MM-DD.",
        });
      }

      // Use the updated query function to fetch stats, totals, and activities
      const dashboardData = await query.adminDashboard.getAll(
        startDate,
        endDate
      );

      // Format and send the combined data
      res.status(200).json({
        stats: dashboardData.stats.map((s) => ({
          date: s.date, // Already formatted in query.js
          entryCount: s.entryCount,
          avgRating: Number((s.averageRating ?? 0).toFixed(2)), // Format average rating
          totalWatchCount: s.totalWatchedCount,
        })),
        totals: dashboardData.totals,
        activities: dashboardData.activities, // Include recent activities
      });
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      res
        .status(500)
        .json({ error: "An error occurred fetching dashboard data." });
    }
  },

  // New Controller function to get users for the admin dashboard
  getUsers: async (req, res) => {
    const { search, page, limit } = req.query;
    try {
      const { users, totalUsers } = await query.user.getUsers(
        search,
        page,
        limit
      );
      res.status(200).json({ users, totalUsers });
    } catch (error) {
      console.error("Error in controller fetching users:", error);
      res
        .status(500)
        .json({ error: "An error occurred while fetching users." });
    }
  },

  // New Controller function to update user role
  updateUserRole: async (req, res) => {
    const { userId } = req.params;
    const { role } = req.body; // Expect role to be "ADMIN" or "USER"
    try {
      // Basic validation for the role
      if (role !== "ADMIN" && role !== "USER") {
        return res.status(400).json({ error: "Invalid role provided." });
      }
      const updatedUser = await query.user.updateUserRole(userId, role);
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error("Error in controller updating user role:", error);
      // Check if the error is due to user not found
      if (error.code === "P2025") {
        return res.status(404).json({ error: "User not found." });
      }
      res
        .status(500)
        .json({ error: "An error occurred while updating the user role." });
    }
  },

  // New Controller function to delete a user
  deleteUser: async (req, res) => {
    const { userId } = req.params;
    try {
      await query.user.deleteUser(userId);
      res.status(200).json({ message: "User deleted successfully." });
    } catch (error) {
      console.error("Error in controller deleting user:", error);
      // Check if the error is due to user not found
      if (error.code === "P2025") {
        return res.status(404).json({ error: "User not found." });
      }
      res
        .status(500)
        .json({ error: "An error occurred while deleting the user." });
    }
  },
};

module.exports = { controller };
