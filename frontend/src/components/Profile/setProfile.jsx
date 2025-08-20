import React, { useState } from "react";
import API from "../../api";
import { useNavigate } from "react-router-dom";
import "./setProfile.css";

export default function SetProfile() {
  const [form, setForm] = useState({
    fullname: "",
    phone: "",
    dob: "",
    gender: "",
    address: "",
    city: "",
    country: "",
    zipCode: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/profile/set-profile", form);
    navigate("/homeloggedin");
  };

  return (
    <div className="set-profile-container">
      <h2 className="set-profile-title">Set Profile</h2>
      <form onSubmit={handleSubmit} className="set-profile-form">
        {Object.keys(form).map((field) => (
          field !== "gender" && (
            <input
              key={field}
              name={field}
              value={form[field]}
              onChange={handleChange}
              type={field === "dob" ? "date" : "text"}
              placeholder={field}
              className="set-profile-input"
            />
          )
        ))}

        <select
          name="gender"
          value={form.gender}
          onChange={handleChange}
          className="set-profile-input"
        >
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>

        <button className="set-profile-button">Save</button>
      </form>
    </div>
  );
}
