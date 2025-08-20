// import React, { useEffect, useState } from "react";
// import API from "../../api";
// import "./viewProfile.css";

// export default function ViewProfile() {
//   const [profile, setProfile] = useState(null);

//   useEffect(() => {
//     API.get("/profile/view-profile")
//       .then((res) => setProfile(res.data))
//       .catch((err) => console.error("Error fetching profile:", err));
//   }, []);

//   if (!profile) return <p className="loading-text">Loading...</p>;

//   return (
//     <div className="view-profile-container">
//       <h2 className="view-profile-title">My Profile</h2>

//       <div className="profile-card">
//         <div className="profile-header">
//           <div>
//             <h3 className="profile-name">{profile.fullname}</h3>
//             <p className="profile-username">@{profile.username}</p>
//           </div>
//         </div>

//         <div className="profile-details">
//           <p><strong>Email:</strong> {profile.email}</p>
//           <p><strong>Phone:</strong> {profile.phone}</p>
//           <p><strong>Gender:</strong> {profile.gender}</p>
//           <p><strong>Date of Birth:</strong> {new Date(profile.dob).toLocaleDateString()}</p>
//           <p><strong>Address:</strong> {profile.address}</p>
//           <p><strong>City:</strong> {profile.city}</p>
//           <p><strong>Country:</strong> {profile.country}</p>
//           <p><strong>Zip Code:</strong> {profile.zipCode}</p>
//         </div>
//       </div>

//       <div className="back-home-container">
//         <button 
//           className="back-home-btn"
//           onClick={() => navigate("/")}
//         >
//           ⬅ Back to Home
//         </button>
//       </div>
      
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import API from "../../api";
import "./viewProfile.css";
import { useNavigate } from "react-router-dom";

export default function ViewProfile() {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/profile/view-profile")
      .then((res) => setProfile(res.data))
      .catch((err) => console.error("Error fetching profile:", err));
  }, []);

  if (!profile) return <p className="loading-text">Loading...</p>;

  return (
    <div className="view-profile-container">
      <h2 className="view-profile-title">My Profile</h2>

      <div className="profile-card">
        <div className="profile-header">
          <div>
            <h3 className="profile-name">{profile.fullname}</h3>
            <p className="profile-username">@{profile.username}</p>
          </div>
        </div>

        <div className="profile-details">
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Phone:</strong> {profile.phone}</p>
          <p><strong>Gender:</strong> {profile.gender}</p>
          <p><strong>Date of Birth:</strong> {new Date(profile.dob).toLocaleDateString()}</p>
          <p><strong>Address:</strong> {profile.address}</p>
          <p><strong>City:</strong> {profile.city}</p>
          <p><strong>Country:</strong> {profile.country}</p>
          <p><strong>Zip Code:</strong> {profile.zipCode}</p>
        </div>
      </div>

      {/* Back Button */}
      <div className="back-home-container">
        <button 
          className="back-home-btn"
          onClick={() => navigate("/homeLoggedIn")}
        >
          ⬅ Back to Home
        </button>
      </div>
    </div>
  );
}
