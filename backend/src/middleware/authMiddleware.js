const jwt = require("jsonwebtoken");
const query = require("../utils/query");

module.exports = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await query.user.getById(decoded.id); // Implement this in your query module
    if (!user) return res.status(401).json({ error: "Unauthorized" });
    req.user = user; // Attach user to request
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};
