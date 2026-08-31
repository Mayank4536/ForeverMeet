require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

// Connect Database
connectDB();

// Start Cron Jobs
require("./jobs/listingExpiry.job");

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("========= GLOBAL ERROR =========");
  console.error(err);
  console.error(err.message);
  console.error(err.stack);

  res.status(500).json({
    success: false,
    message: err.message,
  });
});