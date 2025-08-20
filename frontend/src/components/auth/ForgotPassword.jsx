// src/components/Auth/ForgotPassword.jsx
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ForgotPassword.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); // 1: enter email, 2: enter OTP
  const [error, setError] = useState("");
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post("/api/auth/forgot-password", { email, otp: "0000" });
      setToken(res.data.token);
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.msg || "Failed to verify email.");
    }
  };

  const handleOtpChange = (e) => setOtp(e.target.value);

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    if (otp === "0000") {
      navigate("/reset-password", { state: { token } });
    } else {
      setError("Invalid OTP.");
    }
  };

  return (
    <div className="forgot-container">
      <form onSubmit={step === 1 ? handleEmailSubmit : handleOtpSubmit} className="forgot-form">
        <h2 className="forgot-title">Forgot Password</h2>

        {step === 1 ? (
          <>
            <input
              type="email"
              placeholder="Enter your email"
              className="forgot-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button className="forgot-button" type="submit">Send OTP</button>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              className="forgot-input"
              value={otp}
              onChange={handleOtpChange}
              required
            />
            <button className="forgot-button" type="submit">Verify OTP</button>
          </>
        )}

        {error && <p className="forgot-error">{error}</p>}
      </form>
    </div>
  );
}
