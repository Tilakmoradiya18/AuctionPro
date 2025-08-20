const Auction = require("../models/Auction");

const createAuction = async (req, res) => {
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
      sellerId: req.user._id, // from authMiddleware
    });

    await auction.save();
    res.status(201).json({ message: "Auction created successfully", auction });
  } catch (err) {
    console.error("Create Auction Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createAuction };

