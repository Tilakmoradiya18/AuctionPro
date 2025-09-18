const Auction = require("../models/Auction");

// ✅ Get Sold Items (auctions created by current user and completed)
exports.getSoldItems = async (req, res) => {
  try {
    const userId = req.user.id; // 👈 from auth middleware (JWT)

    const soldItems = await Auction.find({
      sellerId: userId,
      status: "completed",
      winnerId: { $ne: null }
    })
      .populate("winnerId", "username email")
      .sort({ updatedAt: -1 });

    res.json(soldItems);
  } catch (error) {
    console.error("Get Sold Items Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get Bought Items (auctions won by current user)
exports.getBoughtItems = async (req, res) => {
  try {
    const userId = req.user.id;

    const boughtItems = await Auction.find({
      winnerId: userId,
      status: "completed"
    })
      .populate("sellerId", "username email")
      .sort({ updatedAt: -1 });

    res.json(boughtItems);
  } catch (error) {
    console.error("Get Bought Items Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
