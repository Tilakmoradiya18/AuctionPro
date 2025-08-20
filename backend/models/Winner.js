const mongoose = require("mongoose");

const winnerSchema = new mongoose.Schema(
  {
    auctionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auction", // Reference to auction
      required: true,
    },
    winnerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // User who won
      required: true,
    },
    winningBid: {
      type: Number, // Final winning amount
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "delivered"],
      default: "pending", // For future delivery management
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Winner", winnerSchema);
