// src/pages/HomePageLoggedIn.jsx
import React from "react";
import "./HomeLoggedIn.css"; // Import external CSS
import Navbar from "../Navbar/Navbar";

const HomePageLoggedIn = () => {
  return (
    <div className="home-container">
      {/* Top Navigation */}
      {/* <nav className="top-nav">
        <div className="nav-left">
          <h2>AuctionPro</h2>
        </div>
        <div className="nav-right">
          <button className="btn-primary">Live Auctions</button>
          <button className="btn-secondary">Create Auction</button>
          <button className="btn-primary">My Items</button> */}

          {/* Profile Dropdown */}
          {/* <div className="dropdown">
            <button className="btn-profile btn-primary">My Profile ▾</button>
            <div className="dropdown-content">
              <a href="/profile">View Profile</a>
              <a href="/edit-profile">Edit Profile</a>
              <a href="/logout">Logout</a>
            </div>
          </div>
        </div>
      </nav> */}

      <Navbar/>


      {/* Active Auctions */}
      <section className="auction-list">
        <h2>Active Auctions</h2>
        <div className="auction-items">
          <div className="auction-card">
            <h3>Vintage Watch</h3>
            <p>Current Bid: $120</p>
            <button className="btn-primary">Bid Now</button>
          </div>
          <div className="auction-card">
            <h3>Gaming Laptop</h3>
            <p>Current Bid: $800</p>
            <button className="btn-primary">Bid Now</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePageLoggedIn;
