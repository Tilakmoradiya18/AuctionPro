const mongoose = require("mongoose");

const auctionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    images: [
      {
        type: String, // URLs or file paths of images
      },
    ],
    basePrice: {
      type: Number,
      required: true,
    },
    currentPrice: {
      type: Number,
      default: 0, // will update with bids
    },
    timeDuration: {
      type: Date, // auction end time
      required: true,
    },
    status: {
      type: String,
      enum: ["running", "completed","unsold"],
      default: "running",
    },
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // reference to User model
      required: true,
    },
    pickupAddress: {
      type: String,
      required: true,
    },
    winnerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // will be filled when auction completes
      default: null,
    },
    is_expired: { 
      type: Boolean, default: false 
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Auction", auctionSchema);
