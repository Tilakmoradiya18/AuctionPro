const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const checkProfileCompletion = require("../middleware/checkProfileCompletion");

const {
  getProfileStatus,
  setProfile,
  viewProfile,
  updateProfile
} = require("../controllers/profileController");

router.get("/profile-status", authMiddleware, checkProfileCompletion, getProfileStatus);
router.post("/set-profile", authMiddleware, setProfile);
router.get("/view-profile", authMiddleware, viewProfile);
router.put("/update-profile", authMiddleware, updateProfile);

module.exports = router;
