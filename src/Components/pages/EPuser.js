import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function EPuser() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const navigate = useNavigate();
  const userRole = localStorage.getItem("role") || ""; 

  const handleProfileUpdate = (e) => {
    e.preventDefault();

    if (!username || !email || !phone) {
      setMessage("⚠️ All fields are required.");
      setMessageType("error");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setMessage("❌ Please enter a valid email address.");
      setMessageType("error");
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      setMessage("❌ Phone number must be 10 digits.");
      setMessageType("error");
      return;
    }

    setMessage("✅ Profile updated successfully!");
    setMessageType("success");

    setTimeout(() => {
      navigate(userRole === "admin" ? "/admin-panel" : "/user");
    }, 2000);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="border border-2 rounded p-4" style={{ width: "350px", background: "#f8f9fa" }}>
        <h3 className="text-center mb-3 text-dark">📝 Update Profile</h3>

        {message && (
          <p className={`alert ${messageType === "error" ? "alert-danger" : "alert-success"}`}>
            {message}
          </p>
        )}

        <form onSubmit={handleProfileUpdate}>
          <div className="mb-3">
            <label className="form-label fw-bold">Username</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Phone Number</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Update Profile
          </button>

          <button 
            type="button" 
            className="btn btn-secondary w-100 mt-2"
            onClick={() => navigate(userRole === "admin" ? "/admin-panel" : "/user")} 
          >
            🔙 Back to {userRole === "admin" ? "Admin" : "User"} Panel
          </button>
        </form>
      </div>
    </div>
  );
}

export default EPuser;
