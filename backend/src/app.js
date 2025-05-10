require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const router = require("./routes/router");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet()); // Adds security-related HTTP headers to responses for basic protection.
app.use(morgan("dev")); // Logs HTTP requests in concise, colored dev format to console.
app.use(cors()); //Enables cross-origin resource sharing, allowing requests from different domains.
app.use(express.json()); // Adds middleware to parse JSON request bodies into req.body.
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded form data into req.body; supports nested objects.

app.use("/", router);

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
