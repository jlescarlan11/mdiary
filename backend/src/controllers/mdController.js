const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const query = require("../utils/query");

const generateToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: "2days",
  });
};

exports.signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    if (await query.user.getByEmail(email)) {
      return res.status(409).json({ message: "Email already exists" });
    }
    if (await query.user.getByUsername(username)) {
      return res.status(409).json({ message: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await query.user.create(username, email, hashedPassword);

    // Generate token and return
    const token = generateToken(user);
    res.status(201).json({
      message: "User created",
      user: { id: user.id, username: user.username, email: user.email },
      token,
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.login = async (req, res) => {
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

    // Generate and return token
    const token = generateToken(user);
    res.status(200).json({
      message: "Login successful",
      user: { id: user.id, username: user.username, email: user.email },
      token,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.dashboard = (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    res.json({ message: `Welcome, ${req.user.username}` });
  } catch (err) {
    console.error("Dashboard error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.checkUsername = async (req, res) => {
  if (!req.query.username)
    return res.status(400).json({ error: "Username is required" });
  const user = await query.user.getByUsername(req.query.username);
  res.json({ exists: !!user });
};

exports.checkEmail = async (req, res) => {
  const user = await query.user.getByEmail(req.query.email);
  res.json({ exists: !!user });
};
