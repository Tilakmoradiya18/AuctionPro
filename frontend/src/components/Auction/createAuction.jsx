
import React, { useState } from "react";
import API from "../../api";
import "./createAuction.css";
import { useNavigate } from "react-router-dom";

const CreateAuction = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    basePrice: "",
    timeDuration: "",
    pickupAddress: "",
  });
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Handle text inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file uploads
  const handleFileChange = (e) => {
    setImages(e.target.files);
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // ✅ Validate future date
      const selectedDate = new Date(formData.timeDuration);
      const now = new Date();
      if (selectedDate <= now) {
        setMessage("⛔ Please select a future date and time for auction.");
        setLoading(false);
        return;
      }

      const formDataObj = new FormData();
      formDataObj.append("title", formData.title);
      formDataObj.append("description", formData.description);
      formDataObj.append("basePrice", formData.basePrice);
      formDataObj.append("timeDuration", formData.timeDuration);
      formDataObj.append("pickupAddress", formData.pickupAddress);

      for (let i = 0; i < images.length; i++) {
        formDataObj.append("images", images[i]); // ✅ same key as backend
      }

      // ✅ Get JWT token from localStorage
      const token = localStorage.getItem("token");

      const res = await API.post("/auction/create", formDataObj, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, // ✅ Send token
        },
      });

      setMessage(res.data.message || "Auction created successfully!");
      setFormData({
        title: "",
        description: "",
        basePrice: "",
        timeDuration: "",
        pickupAddress: "",
      });
      setImages([]);

      // ✅ Navigate after successful creation
      setTimeout(() => {
        navigate("/HomeLoggedIn");
      }, 1000);
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Something went wrong. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-auction-container">
      <h2>Create Auction</h2>
      {message && <p className="message">{message}</p>}

      <form onSubmit={handleSubmit} className="auction-form">
        <input
          type="text"
          name="title"
          placeholder="Auction Title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        ></textarea>

        <input
          type="number"
          name="basePrice"
          placeholder="Base Price"
          value={formData.basePrice}
          onChange={handleChange}
          required
        />

        <input
          type="datetime-local"
          name="timeDuration"
          value={formData.timeDuration}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="pickupAddress"
          placeholder="Pickup Address"
          value={formData.pickupAddress}
          onChange={handleChange}
          required
        />

        <input type="file" name="images" multiple onChange={handleFileChange} />

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Auction"}
        </button>
      </form>
    </div>
  );
};

export default CreateAuction;
