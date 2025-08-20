const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    // Basic validations
    if (!username || !email || !password || !confirmPassword) {
      return res.status(400).json({ msg: "All fields are required." });
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ msg: "Invalid email format." });
    }

    if (password.length < 6) {
      return res.status(400).json({ msg: "Password must be at least 6 characters long." });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ msg: "Passwords do not match." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ msg: "User registered successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};


exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ msg: "Email and password required." });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ msg: "Invalid email or password." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ msg: "Invalid email or password." });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};


exports.forgotPassword = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ msg: "Email and OTP are required." });
    }

    if (otp !== "0000") {
      return res.status(400).json({ msg: "Invalid OTP." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "Invalid Email." });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "15d" }
    );

    res.status(200).json({
      token,
      msg: "OTP verified. Use this token in Authorization header to reset your password.",
    });

  } catch (err) {
    console.error("Forgot Password Error:", err);
    res.status(500).json({ msg: "Server error." });
  }
};


exports.resetPassword = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ msg: "No token provided." });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const { password, confirmPassword } = req.body;

    if (!password || !confirmPassword)
      return res.status(400).json({ msg: "Both fields are required." });

    if (password.length < 6)
      return res.status(400).json({ msg: "Password must be at least 6 characters." });

    if (password !== confirmPassword)
      return res.status(400).json({ msg: "Passwords do not match." });

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.findByIdAndUpdate(userId, { password: hashedPassword });

    res.json({ msg: "Password updated successfully." });
  } catch (err) {
    console.error(err);
    res.status(401).json({ msg: "Invalid or expired token." });
  }
};
