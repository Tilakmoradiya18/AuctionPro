const Auction = require("../models/Auction");

exports.createAuction = async (req, res) => {
  try {
    const { title, description, basePrice, timeDuration, pickupAddress } = req.body;

    // Validation
    if (!title || !description || !basePrice || !timeDuration || !pickupAddress) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingAuction = await Auction.findOne({ title, sellerId: req.user._id });
    if (existingAuction) {
      return res.status(400).json({ message: "You already created an auction with this title" });
    }

    // Handle uploaded image(s)
    let images = [];
    if (req.files && req.files.length > 0) {
      images = req.files.map((file) => `/uploads/${file.filename}`);
    }

    const auction = new Auction({
      title,
      description,
      images,
      basePrice,
      currentPrice: basePrice, // initially current = base
      timeDuration, // frontend should send end date/time (ISO string)
      pickupAddress,
      is_expired: new Date() > timeDuration,
      sellerId: req.user._id, // from authMiddleware
    });

    await auction.save();
    res.status(201).json({ message: "Auction created successfully", auction });
  } catch (err) {
    console.error("Create Auction Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};


// Get only running auctions (not expired)
exports.getRunningAuctions = async (req, res) => {
  try {

    const auctions = await Auction.find({ is_expired: false }).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      data: auctions,
    });
  } catch (err) {
    console.error("Error fetching running auctions:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

exports.getAuctionById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid auction ID" });
    }

    const auction = await Auction.findById(id);
    if (!auction) {
      return res.status(404).json({ message: "Auction not found" });
    }

    res.json(auction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


