const express = require("express");
const router = express.Router();
const { createAuction } = require("../controllers/auctionController");
const upload = require("../middleware/upload");
const authMiddleware = require("../middleware/authMiddleware"); // JWT auth

// Create Auction with image upload (up to 5 images)
router.post(
  "/create",
  authMiddleware,
  upload.array("images", 5), // max 5 images
  createAuction
);

module.exports = router;
