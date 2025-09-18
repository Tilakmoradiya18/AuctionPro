// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./item.css";
// import Navbar from "../Navbar/Navbar";

// const Item = () => {
//     const [activeTab, setActiveTab] = useState("sold");
//     const [soldItems, setSoldItems] = useState([]);
//     const [boughtItems, setBoughtItems] = useState([]);
//     const [loading, setLoading] = useState(false);

//     // ✅ Format date
//     const formatDate = (dateString) => {
//         return new Date(dateString).toLocaleString("en-IN", {
//             day: "2-digit",
//             month: "short",
//             year: "numeric",
//             hour: "2-digit",
//             minute: "2-digit",
//         });
//     };

//     // ✅ Fetch Sold Items
//     const fetchSoldItems = async () => {
//         try {
//             setLoading(true);
//             const token = localStorage.getItem("token");
//             const { data } = await axios.get("/api/item/sold", {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             setSoldItems(data);
//         } catch (error) {
//             console.error("Error fetching sold items:", error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     // ✅ Fetch Bought Items
//     const fetchBoughtItems = async () => {
//         try {
//             setLoading(true);
//             const token = localStorage.getItem("token");
//             const { data } = await axios.get("/api/item/bought", {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             setBoughtItems(data);
//         } catch (error) {
//             console.error("Error fetching bought items:", error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         if (activeTab === "sold") fetchSoldItems();
//         if (activeTab === "bought") fetchBoughtItems();
//     }, [activeTab]);

//     return (
//         <div className="item-page">
//             <Navbar />

//             <div className="item-container">
//                 <h2 className="item-title">My Items</h2>

//                 {/* Tabs */}
//                 <div className="item-tabs">
//                     <button
//                         className={`item-tab ${activeTab === "sold" ? "active" : ""}`}
//                         onClick={() => setActiveTab("sold")}
//                     >
//                         Sold
//                     </button>
//                     <button
//                         className={`item-tab ${activeTab === "bought" ? "active" : ""}`}
//                         onClick={() => setActiveTab("bought")}
//                     >
//                         Bought
//                     </button>
//                 </div>

//                 {/* Loader */}
//                 {loading ? (
//                     <p className="item-loading">Loading...</p>
//                 ) : (
//                     <div className="item-list">
//                         {activeTab === "sold" &&
//                             (soldItems.length > 0 ? (
//                                 soldItems.map((auction) => (
//                                     <div key={auction._id} className="item-card">
//                                         <img
//                                             src={auction.images?.[0] || "/placeholder.png"}
//                                             alt={auction.title}
//                                             className="item-card-img"
//                                         />
//                                         <h3 className="item-card-title">{auction.title}</h3>
//                                         <p className="item-card-price">
//                                             Sold To: {auction.winnerId?.username || "N/A"} <br />
//                                             Base Price: ₹{auction.basePrice} <br />
//                                             Final Price: ₹{auction.currentPrice} <br />
//                                             Sold At: {formatDate(auction.updatedAt)}
//                                         </p>
//                                     </div>
//                                 ))
//                             ) : (
//                                 <p className="item-empty">No items sold yet.</p>
//                             ))}

//                         {activeTab === "bought" &&
//                             (boughtItems.length > 0 ? (
//                                 boughtItems.map((auction) => (
//                                     <div key={auction._id} className="item-card">
//                                         <img
//                                             src={auction.images?.[0] || "/placeholder.png"}
//                                             alt={auction.title}
//                                             className="item-card-img"
//                                         />
//                                         <h3 className="item-card-title">{auction.title}</h3>
//                                         <p className="item-card-price">
//                                             Seller: {auction.sellerId?.username || "N/A"} <br />
//                                             Base Price: ₹{auction.basePrice} <br />
//                                             Price Paid: ₹{auction.currentPrice} <br />
//                                             Bought At: {formatDate(auction.updatedAt)}
//                                         </p>
//                                     </div>
//                                 ))
//                             ) : (
//                                 <p className="item-empty">No items bought yet.</p>
//                             ))}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Item;


import React, { useEffect, useState } from "react";
import axios from "axios";
import "./item.css";
import Navbar from "../Navbar/Navbar";

const Item = () => {
    const [activeTab, setActiveTab] = useState("sold");
    const [soldItems, setSoldItems] = useState([]);
    const [boughtItems, setBoughtItems] = useState([]);
    const [loading, setLoading] = useState(false);

    // ✅ Format date
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    // ✅ Fetch Sold Items
    const fetchSoldItems = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("token");
            const { data } = await axios.get("/api/item/sold", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setSoldItems(data);
        } catch (error) {
            console.error("Error fetching sold items:", error);
        } finally {
            setLoading(false);
        }
    };

    // ✅ Fetch Bought Items
    const fetchBoughtItems = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("token");
            const { data } = await axios.get("/api/item/bought", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setBoughtItems(data);
        } catch (error) {
            console.error("Error fetching bought items:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (activeTab === "sold") fetchSoldItems();
        if (activeTab === "bought") fetchBoughtItems();
    }, [activeTab]);

    return (
        <div className="item-page">
            <Navbar />

            <div className="item-container">
                <h2 className="item-title">My Items</h2>

                {/* Tabs */}
                <div className="item-tabs">
                    <button
                        className={`item-tab ${activeTab === "sold" ? "active" : ""}`}
                        onClick={() => setActiveTab("sold")}
                    >
                        Sold
                    </button>
                    <button
                        className={`item-tab ${activeTab === "bought" ? "active" : ""}`}
                        onClick={() => setActiveTab("bought")}
                    >
                        Bought
                    </button>
                </div>

                {/* Loader */}
                {loading ? (
                    <p className="item-loading">Loading...</p>
                ) : (
                    <div className="item-list">
                        {activeTab === "sold" &&
                            (soldItems.length > 0 ? (
                                soldItems.map((auction) => (
                                    <div key={auction._id} className="item-card">
                                        <img
                                            src={auction.images?.[0] || "/placeholder.png"}
                                            alt={auction.title}
                                            className="item-card-img"
                                        />
                                        <div className="item-card-body">
                                            <h3 className="item-card-title">{auction.title}</h3>
                                            <p className="item-card-details">
                                                <span className="item-detail-label">Sold To:</span>
                                                <span className="item-detail-value">{auction.winnerId?.username || "N/A"}</span>
                                                <br />
                                                <span className="item-detail-label">Base Price:</span>
                                                <span className="item-detail-value">₹{auction.basePrice}</span>
                                                <br />
                                                <span className="item-detail-label">Final Price:</span>
                                                <span className="item-detail-value">₹{auction.currentPrice}</span>
                                                <br />
                                                <span className="item-detail-date">
                                                    Sold At: {formatDate(auction.updatedAt)}
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="item-empty">No items sold yet.</p>
                            ))}

                        {activeTab === "bought" &&
                            (boughtItems.length > 0 ? (
                                boughtItems.map((auction) => (
                                    <div key={auction._id} className="item-card">
                                        <img
                                            src={auction.images?.[0] || "/placeholder.png"}
                                            alt={auction.title}
                                            className="item-card-img"
                                        />
                                        <div className="item-card-body">
                                            <h3 className="item-card-title">{auction.title}</h3>
                                            <p className="item-card-details">
                                                <span className="item-detail-label">Seller:</span>
                                                <span className="item-detail-value">{auction.sellerId?.username || "N/A"}</span>
                                                <br />
                                                <span className="item-detail-label">Base Price:</span>
                                                <span className="item-detail-value">₹{auction.basePrice}</span>
                                                <br />
                                                <span className="item-detail-label">Price Paid:</span>
                                                <span className="item-detail-value">₹{auction.currentPrice}</span>
                                                <br />
                                                <span className="item-detail-date">
                                                    Bought At: {formatDate(auction.updatedAt)}
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="item-empty">No items bought yet.</p>
                            ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Item;
