import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ViewCategories from "./viewCategories.js"; // Import the new component

function Usercomponent() {
  const navigate = useNavigate();
  const [showCategories, setShowCategories] = useState(false); // State to toggle category view

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center text-primary">Government Tenders - User Dashboard</h1>

      {/* Card for Viewing Categories */}
      <div className="card shadow-sm mt-4">
        <div className="card-body">
          <h2 className="card-title text-secondary">Explore Government Tenders</h2>
          <p className="card-text">
            Browse and apply for various government tenders across multiple categories.
          </p>
          <button
            className="btn btn-primary"
            onClick={() => setShowCategories(!showCategories)}
          >
            {showCategories ? "Hide Tender Categories" : "View Tender Categories"}
          </button>
        </div>
      </div>

      {/* Conditionally Render ViewCategories */}
      {showCategories && <ViewCategories />}
    </div>
  );
}

export default Usercomponent;
