const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");

const authRoutes = require("./routes/auth.routes");
const listingRoutes = require("./routes/listing.routes");
const favoriteRoutes = require("./routes/favorite.routes");
const walletRoutes = require("./routes/wallet.routes");
const adminRoutes = require("./routes/admin.routes");

const app = express();

/*
|--------------------------------------------------------------------------
| Global Middleware
|--------------------------------------------------------------------------
*/

app.use(cors());

app.use(helmet());

app.use(compression());

app.use(morgan("dev"));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

app.use("/api/auth", authRoutes);

app.use("/api/listings", listingRoutes);

app.use("/api/favorites", favoriteRoutes);

app.use("/api/wallet", walletRoutes);

app.use("/api/admin", adminRoutes);

/*
|--------------------------------------------------------------------------
| Root Route
|--------------------------------------------------------------------------
*/

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to ForeverMeet API",
  });
});

module.exports = app;