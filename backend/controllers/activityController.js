const Auction = require("../models/Auction");
const Bid = require("../models/Bid");

// ✅ 1) My Bids
exports.getMyBids = async (req, res) => {
  try {
    const userId = req.user._id;

    // Find all bids placed by this user
    const userBids = await Bid.find({ userId }).distinct("auctionId");

    // Get auctions where this user has placed a bid
    const auctions = await Auction.find({ _id: { $in: userBids } }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: auctions,
    });
  } catch (err) {
    console.error("Get My Bids Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ 2) My Auctions
exports.getMyAuctions = async (req, res) => {
  try {
    const userId = req.user._id;

    const auctions = await Auction.find({ sellerId: userId }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: auctions,
    });
  } catch (err) {
    console.error("Get My Auctions Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
