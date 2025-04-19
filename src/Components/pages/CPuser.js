import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CPuser() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const navigate = useNavigate();
  const userRole = localStorage.getItem("role") || "";
  const handlePasswordChange = () => {
    var condition_obj = {
      "email": localStorage.getItem("email"),
      "password": currentPassword
    };
  
    axios.get("http://your-backend-url/fetch", {
      params: { condition_obj: condition_obj }
    }).then((response) => {
      if (newPassword === confirmPassword) {
        var update_details = {
          "condition_obj": { "email": localStorage.getItem("email") },
          "content_obj": { "password": newPassword }
        };
  
        axios.patch("http://your-backend-url/update", update_details)
          .then((response) => {
            alert("✅ Your password has been successfully changed!");
            navigate("/logout");
          })
          .catch((error) => {
            setMessage("❌ An error occurred while updating password.");
            setMessageType("error");
          });
      } else {
        setMessage("❌ New & Confirm password mismatch, please try again.");
        setMessageType("error");
        setNewPassword("");
        setConfirmPassword("");
      }
    }).catch((error) => {
      setMessage("❌ Invalid old password, please try again.");
      setMessageType("error");
      setCurrentPassword("");
    });
  };
  
   

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="border border-2 rounded p-4" style={{ width: "350px", background: "#e3f2fd" }}>
        <h3 className="text-center mb-3 text-dark">🔑 Change Your Password</h3>

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
            onClick={() => navigate(userRole === "admin" ? "/admin-panel" : "/user")} 
          >
            🔙 Back to {userRole === "admin" ? "Admin" : "User"} Panel
          </button>
        </form>
      </div>
    </div>
  );
}

export default CPuser;
