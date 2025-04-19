import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CPadmin() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    e.preventDefault();

    if (!currentPassword || !newPassword || !confirmPassword) {
      setMessage("⚠️ All fields are required.");
      setMessageType("error");
      return;
    }

    if (currentPassword !== "dummyOldPassword") { 
      setMessage("❌ Incorrect current password.");
      setMessageType("error");
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("❌ New passwords do not match.");
      setMessageType("error");
      return;
    }

    setMessage("✅ Password updated successfully!");
    setMessageType("success");

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");

    setTimeout(() => {
      navigate("/admin");
    }, 2000);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="border border-2 rounded p-4" style={{ width: "350px", background: "#f8f9fa" }}>
        <h3 className="text-center mb-3 text-dark">🔑 Update Password</h3>

        {message && (
          <p className={`alert ${messageType === "error" ? "alert-danger" : "alert-success"}`}>
            {message}
          </p>
        )}

        <form onSubmit={handlePasswordChange}>
          <div className="mb-3">
            <label className="form-label fw-bold">Current Password</label>
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              placeholder="Enter old password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">New Password</label>
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Confirm New Password</label>
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              placeholder="Re-enter new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="showPassword"
              onChange={() => setShowPassword(!showPassword)}
            />
            <label className="form-check-label" htmlFor="showPassword">
              Show Password
            </label>
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Update Password
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

export default CPadmin;
