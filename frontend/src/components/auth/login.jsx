import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Add this line to import the CSS

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/login", formData);
      localStorage.setItem("token", res.data.token);
      navigate("/homeLoggedIn");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h1 className="login-title">Welcome back!</h1>

        <input
          type="email"
          name="email"
          placeholder="Email*"
          className={`login-input ${
            error?.toLowerCase().includes("email") ? "input-error" : ""
          }`}
          onChange={handleChange}
        />
        {error?.toLowerCase().includes("email") && (
          <p className="error-text">Invalid Email</p>
        )}

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="login-input"
          onChange={handleChange}
        />

        <div className="forgot-password">
          <a href="/forgot-password">Forgot password</a>
        </div>

        {error && !error.toLowerCase().includes("email") && (
          <p className="error-text">{error}</p>
        )}

        <button type="submit" className="login-button">
          Login
        </button>

        <p className="signup-text">
          Create Account? <a href="/register">Sign Up</a>
        </p>
      </form>
    </div>
  );
}
