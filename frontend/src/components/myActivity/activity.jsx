// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../../api"; // ✅ our axios instance
// import "./activity.css";
// import Navbar from "../Navbar/Navbar";


// const Activity = () => {
//   const [activeTab, setActiveTab] = useState("bids");
//   const [myBids, setMyBids] = useState([]);
//   const [myAuctions, setMyAuctions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   // ✅ Fetch My Bids
//   const fetchMyBids = async () => {
//     try {
//       const res = await API.get("/activity/my-bids");
//       if (res.data.success) setMyBids(res.data.data);
//     } catch (err) {
//       console.error("Fetch My Bids Error:", err);
//     }
//   };

//   // ✅ Fetch My Auctions
//   const fetchMyAuctions = async () => {
//     try {
//       const res = await API.get("/activity/my-auctions");
//       if (res.data.success) setMyAuctions(res.data.data);
//     } catch (err) {
//       console.error("Fetch My Auctions Error:", err);
//     }
//   };

//   useEffect(() => {
//     const loadData = async () => {
//       setLoading(true);
//       await Promise.all([fetchMyBids(), fetchMyAuctions()]);
//       setLoading(false);
//     };
//     loadData();
//   }, []);

//   const handleDetails = (auctionId) => {
//     navigate(`/auction/${auctionId}`);
//   };

//   return (
//     <div className="activity-container">
//         <Navbar />
//       <h2>My Activity</h2>

//       {/* ✅ Tabs */}
//       <div className="tabs">
//         <button
//           className={activeTab === "bids" ? "active" : ""}
//           onClick={() => setActiveTab("bids")}
//         >
//           My Bids
//         </button>
//         <button
//           className={activeTab === "auctions" ? "active" : ""}
//           onClick={() => setActiveTab("auctions")}
//         >
//           My Auctions
//         </button>
//       </div>

//       {/* ✅ Loader */}
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <div className="auction-list">
//           {activeTab === "bids" &&
//             (myBids.length > 0 ? (
//               myBids.map((auction) => (
//                 <div key={auction._id} className="auction-card">
//                   <img
//                     src={auction.images?.[0] || "/placeholder.png"}
//                     alt={auction.title}
//                   />
//                   <h3>{auction.title}</h3>
//                   <p>Current Bid: ₹{auction.currentPrice}</p>
//                   <button onClick={() => handleDetails(auction._id)}>
//                     See Details
//                   </button>
//                 </div>
//               ))
//             ) : (
//               <p>No bids placed yet.</p>
//             ))}

//           {activeTab === "auctions" &&
//             (myAuctions.length > 0 ? (
//               myAuctions.map((auction) => (
//                 <div key={auction._id} className="auction-card">
//                   <img
//                     src={auction.images?.[0] || "/placeholder.png"}
//                     alt={auction.title}
//                   />
//                   <h3>{auction.title}</h3>
//                   <p>Current Bid: ₹{auction.currentPrice}</p>
//                   <button onClick={() => handleDetails(auction._id)}>
//                     See Details
//                   </button>
//                 </div>
//               ))
//             ) : (
//               <p>No auctions created yet.</p>
//             ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Activity;


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api"; // ✅ axios instance
import "./activity.css";
import Navbar from "../Navbar/Navbar";

const Activity = () => {
    const [activeTab, setActiveTab] = useState("bids");
    const [myBids, setMyBids] = useState([]);
    const [myAuctions, setMyAuctions] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // ✅ Fetch My Bids
    const fetchMyBids = async () => {
        try {
            const res = await API.get("/activity/my-bids");
            if (res.data.success) setMyBids(res.data.data);
        } catch (err) {
            console.error("Fetch My Bids Error:", err);
        }
    };

    // ✅ Fetch My Auctions
    const fetchMyAuctions = async () => {
        try {
            const res = await API.get("/activity/my-auctions");
            if (res.data.success) setMyAuctions(res.data.data);
        } catch (err) {
            console.error("Fetch My Auctions Error:", err);
        }
    };

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            await Promise.all([fetchMyBids(), fetchMyAuctions()]);
            setLoading(false);
        };
        loadData();
    }, []);

    const handleDetails = (auctionId) => {
        navigate(`/auction/${auctionId}`);
    };

    return (
        <div className="activity-page">
            <Navbar />

            <div className="activity-container">
                <div className="activity-header">
                    <h2 className="activity-title">My Activity</h2>
                </div>

                {/* ✅ Tabs */}
                <div className="activity-tabs">
                    <button
                        className={`activity-tab ${activeTab === "bids" ? "active" : ""}`}
                        onClick={() => setActiveTab("bids")}
                    >
                        My Bids
                    </button>
                    <button
                        className={`activity-tab ${activeTab === "auctions" ? "active" : ""}`}
                        onClick={() => setActiveTab("auctions")}
                    >
                        My Auctions
                    </button>
                </div>

                {/* ✅ Loader */}
                {loading ? (
                    <p className="activity-loading">Loading...</p>
                ) : (
                    <div className="activity-list">
                        {activeTab === "bids" &&
                            (myBids.length > 0 ? (
                                myBids.map((auction) => (
                                    <div key={auction._id} className="activity-card">
                                        <img
                                            src={auction.images?.[0] || "/placeholder.png"}
                                            alt={auction.title}
                                            className="activity-card-img"
                                        />
                                        <h3 className="activity-card-title">{auction.title}</h3>
                                        <p className="activity-card-price">
                                            Current Bid: ₹{auction.currentPrice}
                                        </p>
                                        <button
                                            className="activity-card-btn"
                                            onClick={() => handleDetails(auction._id)}
                                        >
                                            See Details
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <p className="activity-empty">No bids placed yet.</p>
                            ))}

                        {activeTab === "auctions" &&
                            (myAuctions.length > 0 ? (
                                myAuctions.map((auction) => (
                                    <div key={auction._id} className="activity-card">
                                        <img
                                            src={auction.images?.[0] || "/placeholder.png"}
                                            alt={auction.title}
                                            className="activity-card-img"
                                        />
                                        <h3 className="activity-card-title">{auction.title}</h3>
                                        <p className="activity-card-price">
                                            Current Bid: ₹{auction.currentPrice}
                                        </p>
                                        <button
                                            className="activity-card-btn"
                                            onClick={() => handleDetails(auction._id)}
                                        >
                                            See Details
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <p className="activity-empty">No auctions created yet.</p>
                            ))}
                    </div>
                )}
            </div>
        </div>


    );
};

export default Activity;
