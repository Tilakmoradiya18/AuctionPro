import React, { useEffect, useState } from "react";
import API from "../../api";
import { useNavigate } from "react-router-dom";
import "./UpdateProfile.css";

export default function UpdateProfile() {
  const [form, setForm] = useState({
    fullname: "",
    phone: "",
    gender: "",
    dob: "",
    address: "",
    city: "",
    country: "",
    zipCode: ""
  });

  const navigate = useNavigate();

  useEffect(() => {
    API.get("/profile/view-profile").then((res) => {
      const data = res.data;
      setForm({
        fullname: data.fullname || "",
        phone: data.phone || "",
        gender: data.gender || "",
        dob: data.dob ? data.dob.split("T")[0] : "", // only date part
        address: data.address || "",
        city: data.city || "",
        country: data.country || "",
        zipCode: data.zipCode || ""
      });
    });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.put("/profile/update-profile", form);
    navigate("/view-profile");
  };

  return (
    <div className="update-profile-container">
      <h2 className="update-profile-title">Update Profile</h2>
      <form onSubmit={handleSubmit} className="update-profile-form">
        
        <label className="update-profile-label">Full Name</label>
        <input
          name="fullname"
          value={form.fullname}
          onChange={handleChange}
          type="text"
          placeholder="Enter your full name"
          className="update-profile-input"
        />

        <label className="update-profile-label">Phone Number</label>
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          type="text"
          placeholder="Enter your phone number"
          className="update-profile-input"
        />

        <label className="update-profile-label">Gender</label>
        <select
          name="gender"
          value={form.gender}
          onChange={handleChange}
          className="update-profile-input"
        >
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>

        <label className="update-profile-label">Date of Birth</label>
        <input
          name="dob"
          value={form.dob}
          onChange={handleChange}
          type="date"
          className="update-profile-input"
        />

        <label className="update-profile-label">Address</label>
        <input
          name="address"
          value={form.address}
          onChange={handleChange}
          type="text"
          placeholder="Enter your address"
          className="update-profile-input"
        />

        <label className="update-profile-label">City</label>
        <input
          name="city"
          value={form.city}
          onChange={handleChange}
          type="text"
          placeholder="Enter your city"
          className="update-profile-input"
        />

        <label className="update-profile-label">Country</label>
        <input
          name="country"
          value={form.country}
          onChange={handleChange}
          type="text"
          placeholder="Enter your country"
          className="update-profile-input"
        />

        <label className="update-profile-label">ZipCode</label>
        <input
          name="zipcode"
          value={form.zipCode}
          onChange={handleChange}
          type="text"
          placeholder="Enter your zip code"
          className="update-profile-input"
        />

        <button className="update-profile-btn">Update</button>
      </form>
    </div>
  );
}
