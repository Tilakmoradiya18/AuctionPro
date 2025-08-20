// src/components/Home/Landing.jsx
import { Link } from "react-router-dom";
import "./Landing.css"; 

export default function Landing() {
  return (
    <div className="landing-container">
      {/* Welcome Banner */}
      <section className="landing-banner">
        <h1 className="landing-title">Welcome to AuctionPro</h1>
        <p className="landing-subtitle">Bid smart. Win big.</p>
        <div className="landing-buttons">
          <Link to="/login" className="landing-login">Login</Link>
          <Link to="/register" className="landing-register">Sign Up</Link>
        </div>
      </section>

      {/* About Us */}
      <section className="landing-about">
        <h2>About Us</h2>
        <p>
          AuctionPro is an online platform where users can list, bid, and win items in real-time.
          Whether you're selling your products or looking for unique deals, our secure auction system ensures a fair and transparent experience.
        </p>
      </section>

      {/* Features */}
      <section className="landing-features">
        <div className="feature-card">
          <h3>Live Bidding</h3>
          <p>Participate in real-time auctions and place your bids instantly.</p>
        </div>
        <div className="feature-card">
          <h3>Secure Transactions</h3>
          <p>All transactions are protected with our trusted payment partners.</p>
        </div>
        <div className="feature-card">
          <h3>Wide Variety</h3>
          <p>Bid on electronics, art, collectibles, and more.</p>
        </div>
      </section>
    </div>
  );
}
