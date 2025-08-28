const express = require("express");
const router = express.Router();
const { createAuction,getRunningAuctions,getAuctionById} = require("../controllers/auctionController");
const upload = require("../middleware/upload");
const authMiddleware = require("../middleware/authMiddleware"); // JWT auth

router.post("/create",authMiddleware,upload.array("images", 5), createAuction);
router.get("/running", getRunningAuctions);
router.get("/:id", getAuctionById);

module.exports = router;
