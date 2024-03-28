const express = require("express");
const connectDB = require("./src/config/db");
const { setError } = require("./src/config/error");
const { indexRouter } = require("./src/api/routes/indexRouter");
require("dotenv").config();
require("./src/config/cloudinary");

const app = express();
app.use(express.json());
connectDB();

app.use("/api/v1", indexRouter);

app.use("*", (req, res, next) => {
  return next(setError(404, "Not Found"));
});

app.use((error, req, res, next) => {
  return res
    .status(error.status || 500)
    .json(error.message || "Internal Server Error");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
