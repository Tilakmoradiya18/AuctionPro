
import React, { useEffect, useState } from "react";
import "./HomeLoggedIn.css"; 
import Navbar from "../Navbar/Navbar";
import API from "../../api"; // Your Axios instance
import { useNavigate } from "react-router-dom";

const HomePageLoggedIn = () => {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch running auctions
  const fetchAuctions = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await API.get("/auction/running", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAuctions(res.data.data);
    } catch (err) {
      console.error("Error fetching auctions:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAuctions();
  }, []);

  // Function to calculate remaining time
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

  // Navigate to bid page (or handle bid logic)
  const handleBid = (auctionId) => {
    navigate(`/auction/${auctionId}`); // example: open auction detail page
  };

  if (loading) return <p>Loading auctions...</p>;

  return (
    <div className="home-container">
      <Navbar />

      <section className="auction-list">
        <h2>Active Auctions</h2>
        {auctions.length === 0 ? (
          <p>No active auctions currently.</p>
        ) : (
          <div className="auction-items">
            {auctions.map((auction) => (
              <div className="auction-card" key={auction._id}>
                <img
                  src={auction.images[0] || "/default-image.jpg"}
                  alt={auction.title}
                  className="auction-image"
                />
                <h3>{auction.title}</h3>
                <p>Current Bid: ₹{auction.currentPrice}</p>
                <p>Remaining Time: {getRemainingTime(auction.timeDuration)}</p>
                <button
                  className="btn-primary"
                  onClick={() => handleBid(auction._id)}
                >
                  Bid Now
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePageLoggedIn;
