const express = require("express");
const router = express.Router();
const { getSoldItems, getBoughtItems } = require("../controllers/itemController");
const authMiddleware = require("../middleware/authMiddleware");

// 👇 Protected Routes
router.get("/sold", authMiddleware, getSoldItems);
router.get("/bought", authMiddleware, getBoughtItems);

module.exports = router;
