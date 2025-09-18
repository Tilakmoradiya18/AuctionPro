const express = require("express");
const router = express.Router();
const { getMyBids, getMyAuctions } = require("../controllers/activityController");
const authMiddleware = require("../middleware/authMiddleware");

// Protected routes → user must be logged in
router.get("/my-bids", authMiddleware, getMyBids);
router.get("/my-auctions", authMiddleware, getMyAuctions);

module.exports = router;
