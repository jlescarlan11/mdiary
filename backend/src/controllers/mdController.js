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
    const hashedPassword = await bcrypt.hash(password, 10);

    await query.user.create(username, email, hashedPassword);

    res.status(201).json({ message: "User Created" });
  } catch (err) {
    console.error("Signup error: ", err);
    res.status(400).json({ error: "User already exists or invalid data" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await query.user.getByEmail(email);

    if (!user) return res.status(404).json({ error: "User not found" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: "Invalid credentials" });

    const token = generateToken(user);
    res.json({ token, username: user.username });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

exports.dashboard = (req, res) => {
  try {
    console.log("Authenticated User:", req.user); // Add this line
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
  const user = await query.user.getByUsername(req.query.username);
  res.json({ exists: !!user });
};

exports.checkEmail = async (req, res) => {
  const user = await query.user.getByEmail(req.query.email);
  res.json({ exists: !!user });
};
