const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/db");
const { setError } = require("./src/config/error");
const { indexRouter } = require("./src/api/routes/indexRouter");
const rateLimit = require("express-rate-limit");
require("dotenv").config();
require("./src/config/cloudinary");

const app = express();
app.use(cors());

const limiter = rateLimit({
  windowMs: 3 * 60 * 1000, // 15 minutes
  limit: 50, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: false, // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  // store: ... , // Redis, Memcached, etc. See below.
});

// Apply the rate limiting middleware to all requests.
app.use(limiter);

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
