const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const query = require("../utils/query");
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
      if (await query.user.getByEmail(email)) {
        return res.status(409).json({ message: "Email already exists." });
      }

      const isAdmin = inviteCode === process.env.ADMIN_INVITE_CODE;

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await query.user.create(
        username,
        email,
        hashedPassword,
        isAdmin
      );

      const token = generateToken({
        id: newUser.id,
        email: newUser.email,
        role: newUser.role,
      });

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
      console.error("Signup error:", err);
      res.status(500).json({ error: "Server error during signup process." });
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await query.user.getByEmail(email);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const token = generateToken(user);
      res.status(200).json({
        message: "Login successful",
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
        token,
      });
    } catch (err) {
      console.error("Login error:", err);
      res.status(500).json({ error: "Server error" });
    }
  },
  adminLogin: async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await query.user.getByEmail(email);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Additional admin role check
      if (user.role !== "ADMIN") {
        return res.status(403).json({ error: "Admin access required" });
      }

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const token = generateToken(user);
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
      console.error("Admin login error:", err);
      res.status(500).json({ error: "Server error during admin login" });
    }
  },

  dashboard: (req, res) => {
    try {
      const user = req.user; // make sure you attach the user in your auth middleware
      if (!user) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      res.json({ user });
    } catch (err) {
      console.error("Dashboard error:", err);
      res.status(500).json({ error: "Server error" });
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
        genres = [],
        directors = [],
      } = req.body;

      // Validation
      if (!title || !year || !duration || !description || !posterUrl) {
        return res
          .status(400)
          .json({ error: "All required fields must be provided" });
      }

      const movie = await prisma.movie.create({
        data: {
          title,
          year: parseInt(year),
          duration: parseInt(duration),
          description,
          posterUrl,
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
        include: {
          genres: { include: { genre: true } },
          directors: { include: { director: true } },
        },
      });

      res.status(201).json(movie);
    } catch (error) {
      console.error("Error creating movie:", error);

      if (error.code === "P2002") {
        return res
          .status(400)
          .json({ error: "Movie with this title already exists" });
      }
      if (error.code === "P2003") {
        return res.status(400).json({ error: "Invalid data format provided" });
      }

      res.status(500).json({ error: "Internal server error" });
    }
  },
  getAllGenres: async (req, res) => {
    try {
      const genres = await query.genre.getAll();
      res.status(200).json(genres);
    } catch (err) {
      console.error("Error fetching genres:", err);
      res.status(500).json({ error: "Server error fetching genres" });
    }
  },

  getAllDirectors: async (req, res) => {
    try {
      const directors = await query.director.getAll();
      res.status(200).json(directors);
    } catch (err) {
      console.error("Error fetching directors:", err);
      res.status(500).json({ error: "Server error fetching directors" });
    }
  },
};

module.exports = { controller };
