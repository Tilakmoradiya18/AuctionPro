import React, { useEffect, useState } from "react";
import API from "../../api";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css"; // Import external CSS

export default function Navbar() {
  const [profileComplete, setProfileComplete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/profile/profile-status")
      .then((res) => setProfileComplete(res.data.profileComplete))
      .catch(() => setProfileComplete(null));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleViewProfile = () => {
    navigate("/view-profile");
  }

  const handleUpdateProfile = () => {
    navigate("/update-profile");
  }

  const handleSetProfile = () => {
    navigate("/set-profile");
  }

  return (
    <nav className="navbar">
      <div className="navbar-links">
        <Link to="/">Live Auctions</Link>
        <Link to="/create-auction">Create Auction</Link>
        <Link to="/my-items">My Items</Link>
      </div>
      <div className="profile-group">
        <button className="profile-button">My Profile</button>
        <div className="profile-dropdown">
          {!profileComplete ? (
            <>
              {/* <Link to="/set-profile">Set Profile</Link> */}
              <button onClick={handleSetProfile}>Set Profile</button>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              {/* <Link to="/view-profile">View Profile</Link> */}
              <button onClick={handleViewProfile}>View Profile</button>
              {/* <Link to="/update-profile">Update Profile</Link> */}
              <button onClick={handleUpdateProfile}>Update Profile</button>              
              <button onClick={handleLogout}>Logout</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
