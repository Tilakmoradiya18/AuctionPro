// const express = require("express");
// const dotenv = require("dotenv");
// const cors = require("cors");
// const mongoose = require("mongoose");
// const path = require("path");

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// // ✅ Import Auth Routes
// const authRoutes = require("./routes/authRoutes");
// const profileRoutes = require("./routes/profileRoutes");
// const auctionRoutes = require("./routes/auctionRoutes");

// // ✅ Connect to MongoDB
// mongoose
//   .connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("✅ MongoDB connected"))
//   .catch((err) => console.log("❌ MongoDB connection error:", err));

// // ✅ Default Route
// app.get("/", (req, res) => {
//   res.send("AuctionPro Backend Running...");
// });

// // ✅ Auth API Route
// app.use("/api/auth", authRoutes);
// app.use("/api/profile", profileRoutes);
// app.use("/api/auction",auctionRoutes);
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));



// // ✅ Start Server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`✅ Server running on port ${PORT}`);
// });

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Import Routes
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const auctionRoutes = require("./routes/auctionRoutes");

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ MongoDB connected");

    // ✅ Import cron AFTER DB connection
    require("./cron");
  })
  .catch((err) => console.log("❌ MongoDB connection error:", err));

// ✅ Default Route
app.get("/", (req, res) => {
  res.send("AuctionPro Backend Running...");
});

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/auction", auctionRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
