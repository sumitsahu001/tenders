import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function UpdateAdminProfile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); 

  const navigate = useNavigate();

  const handleProfileUpdate = (e) => {
    e.preventDefault();

    if (!name || !email || !mobile || !city || !address || !gender) {
      setMessage("⚠️ All fields are required.");
      setMessageType("error");
      return;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(email)) {
      setMessage("❌ Invalid email format.");
      setMessageType("error");
      return;
    }

    if (!/^\d{10}$/.test(mobile)) {
      setMessage("❌ Mobile number must be 10 digits.");
      setMessageType("error");
      return;
    }

    setMessage("✅ Profile updated successfully!");
    setMessageType("success");

    setTimeout(() => {
      setMessage("");
      navigate("/admin"); 
    }, 2000);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="border border-2 rounded p-4 bg-light" style={{ width: "400px" }}>
        <h3 className="text-center mb-3 text-dark">📝 Update Admin Profile</h3>

        {message && (
          <p className={`alert ${messageType === "error" ? "alert-danger" : "alert-success"}`}>
            {message}
          </p>
        )}

        <form onSubmit={handleProfileUpdate}>
          <div className="mb-3">
            <label className="form-label fw-bold">Full Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
            <label className="form-label fw-bold">Mobile</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your mobile number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">City</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Address</label>
            <textarea
              className="form-control"
              placeholder="Enter your address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              rows="2"
              required
            ></textarea>
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Gender</label>
            <select
              className="form-select"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Update Profile
          </button>

          <button
            type="button"
            className="btn btn-secondary w-100 mt-2"
            onClick={() => navigate("/admin")}
          >
            🔙 Back to Admin Panel
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateAdminProfile;
