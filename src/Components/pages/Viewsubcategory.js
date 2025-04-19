import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { __subcategoryapiurl } from "./API_URL.js";

function ViewSubcategory() {
  const { categoryId } = useParams();
  const [subcategories, setSubcategories] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (categoryId) {
      fetchSubcategories(categoryId);
    }
  }, [categoryId]);

  const fetchSubcategories = async (categoryId) => {
    try {
      console.log("Fetching subcategories...");
      const response = await axios.get(`${__subcategoryapiurl}fetch`, {
        params: { condition_obj: JSON.stringify({ catnm: categoryId }) },
      });
      console.log("Subcategories fetched:", response.data);

      if (Array.isArray(response.data)) {
        setSubcategories(response.data);
      } else {
        throw new Error("Invalid data format received");
      }
    } catch (error) {
      console.error("Error fetching subcategories:", error);
      setError("Failed to load subcategories. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center text-success">Subcategories</h2>
      {error && <p className="text-danger text-center">{error}</p>}
      {loading ? (
        <p className="text-center">Loading subcategories...</p>
      ) : (
        <div className="row">
          {subcategories.length > 0 ? (
            subcategories.map((subcategory) => (
              <div key={subcategory._id} className="col-md-4 mb-3">
              <Link to={`/add-bid/${subcategory._id}`}>
                <div className="card shadow-sm" style={{ cursor: "pointer" }}>
                    <img
                      src={`http://localhost:3001/assets/uploads/subcaticons/${subcategory.subcaticonm}`}
                      className="card-img-top"
                      alt={subcategory.subcatnm}
                      onError={(e) => { e.target.src = "/placeholder.png"; }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{subcategory.subcatnm}</h5>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <p className="text-center">No subcategories available.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default ViewSubcategory;
