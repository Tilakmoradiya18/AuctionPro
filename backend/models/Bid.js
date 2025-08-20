const mongoose = require("mongoose");

const bidSchema = new mongoose.Schema(
  {
    auctionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auction", // reference to Auction model
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // reference to User who placed the bid
      required: true,
    },
    bidAmount: {
      type: Number,
      required: true,
    },
    bidTime: {
      type: Date,
      default: Date.now, // automatically store when bid placed
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Bid", bidSchema);
