
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../api";
import "./Bid.css";
import Navbar from "../Navbar/Navbar";

const Bid = () => {
  const { id } = useParams(); // auction id from URL
  const navigate = useNavigate();
  // const storedUser = JSON.parse(localStorage.getItem("user"));

  const [auction, setAuction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bidAmount, setBidAmount] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);

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
  const handlePlaceBid = () => {
    if (!Number.isInteger(Number(bidAmount))) {
      alert("Please enter a valid integer amount");
      return;
    }
    if (Number(bidAmount) <= auction.currentPrice) {
      alert("Bid must be higher than current bid");
      return;
    }
    setShowConfirm(true); // show confirmation popup
  };

  // Confirm bid
  const confirmBid = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await API.post(
        "/bid/place-bid",
        { auctionId: id, bidAmount: Number(bidAmount) },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        alert("Bid placed successfully!");
        fetchAuction(); // refresh auction details
        setBidAmount("");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Error placing bid");
    }
    setShowConfirm(false);
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

          <p className="bid-seller">
            <strong>Creator:</strong> {auction.sellerId?.username}
          </p>

          <p className="bid-price">
            <strong>Current Bid:</strong> ₹{auction.currentPrice}
          </p>

          <p className="bid-highest-bidder">
            <strong>Current Bidder:</strong>{" "}
            {auction.highestBidder ? auction.highestBidder : "No bids yet"}
          </p> 
            
          <p className="bid-starting">
            <strong>Starting Bid:</strong> ₹{auction.basePrice}
          </p>
          <p className="bid-timer">
            <strong>Auction Ends In:</strong>{" "}
            {getRemainingTime(auction.timeDuration)}
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

      {showConfirm && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h3 className="popup-title">Confirm Your Bid</h3>
            <p className="popup-message">
              Are you sure you want to place a bid of{" "}
              <strong>₹{bidAmount}</strong>?
            </p>
            <div className="popup-buttons">
              <button
                onClick={() => setShowConfirm(false)}
                className="popup-button cancel-button"
              >
                Cancel
              </button>
              <button
                onClick={confirmBid}
                className="popup-button confirm-button"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bid;

