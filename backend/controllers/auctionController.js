
const Auction = require("../models/Auction");
const Bid = require("../models/Bid");
const Winner = require("../models/Winner");

// Create Auction remains the same
exports.createAuction = async (req, res) => {
  try {
    const { title, description, basePrice, timeDuration, pickupAddress } = req.body;

    if (!title || !description || !basePrice || !timeDuration || !pickupAddress) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingAuction = await Auction.findOne({ title, sellerId: req.user._id });
    if (existingAuction) {
      return res.status(400).json({ message: "You already created an auction with this title" });
    }

    let images = [];
    if (req.files && req.files.length > 0) {
      images = req.files.map((file) => `/uploads/${file.filename}`);
    }

    const auction = new Auction({
      title,
      description,
      images,
      basePrice,
      currentPrice: basePrice,
      timeDuration,
      pickupAddress,
      is_expired: false, // initial false, cron will update
      sellerId: req.user._id,
    });

    await auction.save();
    res.status(201).json({ message: "Auction created successfully", auction });
  } catch (err) {
    console.error("Create Auction Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get running auctions
exports.getRunningAuctions = async (req, res) => {
  try {
    const userId = req.user._id;
    const auctions = await Auction.find({
      is_expired: false,
      sellerId: { $ne: userId },
    }).sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: auctions });
  } catch (err) {
    console.error("Error fetching running auctions:", err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get auction by ID
exports.getAuctionById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid auction ID" });
    }

    const auction = await Auction.findById(id)
      .populate("sellerId", "username email");
    if (!auction) return res.status(404).json({ message: "Auction not found" });

    const highestBid = await Bid.findOne({ auctionId: id })
      .sort({ bidAmount: -1 })
      .populate("userId", "username");

    res.json({
      ...auction.toObject(),
      highestBidder: highestBid ? highestBid.userId.username : null,
    });
  } catch (error) {
    console.error("Get Auction By ID Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


exports.finalizeExpiredAuctions = async () => {
  try {
    const now = new Date();
    const expiredAuctions = await Auction.find({
      is_expired: false,
      timeDuration: { $lte: now },
    });

    for (const auction of expiredAuctions) {
      // Find highest bid
      const highestBid = await Bid.findOne({ auctionId: auction._id }).sort({ bidAmount: -1 });

      if (highestBid) {
        // Save winner record
        const winner = new Winner({
          auctionId: auction._id,
          winnerId: highestBid.userId,
          winningBid: highestBid.bidAmount,
        });
        await winner.save();

        // 🔥 Update auction with winner info and mark expired
        auction.is_expired = true;
        auction.status = "completed";        // update status
        auction.winnerId = highestBid.userId; // save winner inside auction
        auction.currentPrice = highestBid.bidAmount; // final price
        await auction.save();
      } else {
        // If no bids → just expire auction
        auction.is_expired = true;
        auction.status = "unsold";
        await auction.save();
      }
    }

    // console.log(`Cron: Finalized ${expiredAuctions.length} auctions`);
  } catch (err) {
    console.error("Cron finalizeExpiredAuctions error:", err);
  }
};
