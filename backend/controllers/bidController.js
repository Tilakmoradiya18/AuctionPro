
const Bid = require("../models/Bid");
const Auction = require("../models/Auction");

exports.placeBid = async (req, res) => {
  try {
    const { auctionId, bidAmount } = req.body;
    const userId = req.user._id;

    // Find auction
    const auction = await Auction.findById(auctionId);
    if (!auction) {
      return res.status(404).json({ success: false, message: "Auction not found" });
    }

    // Check auction not expired
    if (new Date() > auction.timeDuration || auction.is_expired) {
      return res.status(400).json({ success: false, message: "Auction has expired" });
    }

    // Validate bid
    if (!Number.isInteger(bidAmount)) {
      return res.status(400).json({ success: false, message: "Bid amount must be an integer" });
    }

    if (bidAmount <= auction.currentPrice) {
      return res.status(400).json({ success: false, message: "Bid must be higher than current bid" });
    }

    // Save bid
    const newBid = new Bid({
      auctionId,
      userId,
      bidAmount
    });
    await newBid.save();

    // Update auction currentPrice
    auction.currentPrice = bidAmount;
    await auction.save();

    res.status(201).json({
      success: true,
      message: "Bid placed successfully",
      data: newBid,
      updatedAuction: auction
    });
  } catch (err) {
    console.error("Place Bid Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

