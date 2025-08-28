const cron = require("node-cron");
const Auction = require("./models/Auction"); // path to your auction model

// Run every minute
cron.schedule("* * * * *", async () => {
  const now = new Date();
  try {
    const result = await Auction.updateMany(
      { timeDuration: { $lte: now }, is_expired: false },
      { $set: { is_expired: true, status: "expired" } }
    );
    if (result.modifiedCount > 0) {
      console.log(`${result.modifiedCount} auctions marked as expired at ${now}`);
    }
  } catch (err) {
    console.error("Error updating expired auctions:", err);
  }
});
