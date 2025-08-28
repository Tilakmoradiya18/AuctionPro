import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../api"; 
import "./Bid.css";
import Navbar from "../Navbar/Navbar";

const Bid = () => {
  const { id } = useParams(); // auction id from URL
  const navigate = useNavigate();

  const [auction, setAuction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bidAmount, setBidAmount] = useState("");

  // Fetch auction by ID
  const fetchAuction = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await API.get(`/auction/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAuction(res.data);
    } catch (err) {
      console.error("Error fetching auction:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAuction();
  }, [id]);

  // Calculate remaining time
  const getRemainingTime = (endTime) => {
    const now = new Date();
    const end = new Date(endTime);
    const diff = end - now;

    if (diff <= 0) return "Expired";

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return `${hours}h ${minutes}m ${seconds}s`;
  };

  // Handle place bid
  const handlePlaceBid = async () => {
    alert(`Placing bid of ₹${bidAmount} (API will be added later)`);
    // TODO: Implement place bid API
  };

  if (loading) return <p>Loading auction details...</p>;
  if (!auction) return <p>Auction not found</p>;

  return (
    <div>
      <Navbar />
      <button onClick={() => navigate(-1)} style={{ margin: "20px" }}>
        ⬅ Back to Home
      </button>

      <div className="bid-container">
        <div className="bid-image-section">
          <img
            src={auction.images[0] || "/default-image.jpg"}
            alt={auction.title}
            className="bid-main-image"
          />
        </div>

        <div className="bid-details">
          <h2 className="bid-title">{auction.title}</h2>
          <p className="bid-description">{auction.description}</p>

          <p className="bid-price">
            <strong>Current Bid:</strong> ₹{auction.currentPrice}
          </p>
          <p className="bid-starting">
            <strong>Starting Bid:</strong> ₹{auction.basePrice}
          </p>
          <p className="bid-timer">
            <strong>Auction Ends In:</strong> {getRemainingTime(auction.timeDuration)}
          </p>

          <div className="bid-action">
            <input
              type="number"
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              placeholder="Enter your bid"
              className="bid-input"
            />
            <button className="bid-button" onClick={handlePlaceBid}>
              Place Bid
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bid;
