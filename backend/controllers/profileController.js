const User = require("../models/User");

// Check profile status
const getProfileStatus = (req, res) => {
  res.json({ profileComplete: req.profileComplete });
};

// Set profile for first-time users
const setProfile = async (req, res) => {
  try {
    const { fullname, phone, dob, gender, address, city, country, zipCode, profileImage } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.fullname = fullname;
    user.phone = phone;
    user.dob = dob;
    user.gender = gender;
    user.address = address;
    user.city = city;
    user.country = country;
    user.zipCode = zipCode;
    user.profileImage = profileImage;

    await user.save();
    res.json({ message: "Profile set successfully", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// View profile
const viewProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update profile
const updateProfile = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.user._id, req.body, { new: true });
    res.json({ message: "Profile updated successfully", updatedUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getProfileStatus,
  setProfile,
  viewProfile,
  updateProfile,
};
