require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mdRouter = require("./routes/mdRouter");

const app = express();
const PORT = process.env.port || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", mdRouter);

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
