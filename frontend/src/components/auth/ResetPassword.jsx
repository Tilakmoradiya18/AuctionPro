// src/components/Auth/ResetPassword.jsx
import { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "./ResetPassword.css";

export default function ResetPassword() {
  const [formData, setFormData] = useState({ password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const token = location.state?.token;

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await axios.put("/api/auth/reset-password", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.msg || "Reset failed.");
    }
  };

  return (
    <div className="reset-container">
      <form onSubmit={handleSubmit} className="reset-form">
        <h2 className="reset-title">Reset Password</h2>

        <input
          type="password"
          name="password"
          placeholder="New Password"
          className="reset-input"
          onChange={handleChange}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          className="reset-input"
          onChange={handleChange}
        />

        <button type="submit" className="reset-button">Reset</button>

        {error && <p className="reset-error">{error}</p>}
      </form>
    </div>
  );
}
