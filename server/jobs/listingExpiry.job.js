const cron = require("node-cron");
const Listing = require("../models/Listing");

cron.schedule("0 * * * *", async () => {
  try {
    const result = await Listing.updateMany(
      {
        status: "approved",
        expiresAt: {
          $lte: new Date(),
        },
      },
      {
        $set: {
          status: "expired",
        },
      }
    );

    console.log(
      `Expired Listings Updated: ${result.modifiedCount}`
    );

  } catch (error) {

    console.log(error);

  }
});