// // src/components/Auth/Register.jsx
// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export default function Register() {
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (formData.password !== formData.confirmPassword) {
//       setError("Passwords do not match");
//       return;
//     }

//     try {
//       await axios.post("/api/auth/register", formData);
//       navigate("/login");
//     } catch (err) {
//       console.log("Register error:", err.response?.data || err.message);
//       setError(err.response?.data?.message || "Registration failed");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#fef8f5] flex justify-center items-center">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white shadow-lg p-8 rounded-xl w-full max-w-sm"
//       >
//         <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>

//         <input
//           type="text"
//           name="username"
//           placeholder="Username"
//           className="w-full border border-gray-300 p-2 rounded-md mb-3"
//           onChange={handleChange}
//         />

//         <input
//           type="email"
//           name="email"
//           placeholder="Email*"
//           className={`w-full p-2 border rounded-md mb-1 ${
//             error?.toLowerCase().includes("email") ? "border-red-500" : "border-gray-300"
//           }`}
//           onChange={handleChange}
//         />
//         {error?.toLowerCase().includes("email") && (
//           <p className="text-sm text-red-500 mb-2">Invalid Email</p>
//         )}

//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           className="w-full border border-gray-300 p-2 rounded-md mb-3"
//           onChange={handleChange}
//         />

//         <input
//           type="password"
//           name="confirmPassword"
//           placeholder="Confirm Password"
//           className="w-full border border-gray-300 p-2 rounded-md mb-3"
//           onChange={handleChange}
//         />

//         {error && !error.toLowerCase().includes("email") && (
//           <p className="text-sm text-red-500 mb-3">{error}</p>
//         )}

//         <button
//           type="submit"
//           className="w-full bg-[#edc37d] text-white font-semibold p-2 rounded-md mb-3"
//         >
//           Register
//         </button>

//         <p className="text-center text-sm">
//           Already have an account?{" "}
//           <a href="/login" className="text-blue-500 hover:underline">
//             Login
//           </a>
//         </p>
//       </form>
//     </div>
//   );
// }

// src/components/Auth/Register.jsx
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Register.css"; // Make sure to import the CSS

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await axios.post("/api/auth/register", formData);
      navigate("/login");
    } catch (err) {
      console.log("Register error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  const isEmailError = error?.toLowerCase().includes("email");

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form">
        <h2 className="register-title">Create Account</h2>

        <input
          type="text"
          name="username"
          placeholder="Username"
          className="input"
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email*"
          className={`input ${isEmailError ? "input-error" : ""}`}
          onChange={handleChange}
        />
        {isEmailError && <p className="error-msg">Invalid Email</p>}

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="input"
          onChange={handleChange}
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          className="input"
          onChange={handleChange}
        />

        {error && !isEmailError && <p className="error-msg">{error}</p>}

        <button type="submit" className="btn">
          Register
        </button>

        <p className="link-text">
          Already have an account? <a href="/login">Login</a>
        </p>
      </form>
    </div>
  );
}

