import React, { useState, useEffect } from "react";
import axios from "axios";
import { __categoryapiurl } from "./API_URL.js";
import { useNavigate } from "react-router-dom";

function ViewCategories() {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true); // Added loading state
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      console.log("Fetching categories...");
      const response = await axios.get(`${__categoryapiurl}fetch`);
      console.log("Categories fetched:", response.data);

      if (Array.isArray(response.data)) {
        setCategories(response.data);
      } else {
        throw new Error("Invalid data format received");
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      setError("Failed to load categories. Please try again.");
    } finally {
      setLoading(false); // Ensure loading stops
    }
  };

  const handleCategoryClick = (categoryId) => {
    navigate(`/Viewsubcategory/${categoryId}`);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center text-primary">Available Tender Categories</h2>
      {error && <p className="text-danger text-center">{error}</p>}
      {loading ? (
        <p className="text-center">Loading categories...</p>
      ) : (
        <div className="row">
          {categories.length > 0 ? (
            categories.map((category) => (
              <div key={category._id} className="col-md-4 mb-3">
                <div className="card shadow-sm" onClick={() => handleCategoryClick(category._id)} style={{ cursor: "pointer" }}>
                  <img
               src={`http://localhost:3001/assets/uploads/caticons/${category.caticonnm}`}
                    className="card-img-top"
                    alt={category.catnm}
                    onError={(e) => { e.target.src = "/placeholder.png"; }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{category.catnm}</h5>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">No categories available.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default ViewCategories;
