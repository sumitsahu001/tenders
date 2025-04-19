import React, { useState, useEffect } from "react";
import axios from "axios";
import { __categoryapiurl, __subcategoryapiurl } from "./API_URL.js";

function AddSubcategory() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [subcatName, setSubcatName] = useState("");
  const [subcatIcon, setSubcatIcon] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${__categoryapiurl}fetch`, {
        params: { condition_obj: {} },
      });
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleFileChange = (event) => {
    setSubcatIcon(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedCategory || !subcatName || !subcatIcon) {
      setMessage("All fields are required!");
      return;
    }

    const formData = new FormData();
    formData.append("catnm", selectedCategory);
    formData.append("subcatnm", subcatName);
    formData.append("caticon", subcatIcon);

    try {
      const response = await axios.post(`${__subcategoryapiurl}save`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.status) {
        setMessage("Subcategory added successfully!");
        setSubcatName("");
        setSubcatIcon(null);
      } else {
        setMessage("Failed to add subcategory.");
      }
    } catch (error) {
      console.error("Error adding subcategory:", error);
      setMessage("Server error, please try again later.");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center text-success">Add Subcategory</h2>
      {message && <p className="text-center text-danger">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Select Category:</label>
          <select
            className="form-control"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.catnm}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group mt-2">
          <label>Subcategory Name:</label>
          <input
            type="text"
            className="form-control"
            value={subcatName}
            onChange={(e) => setSubcatName(e.target.value)}
          />
        </div>

        <div className="form-group mt-2">
          <label>Subcategory Icon:</label>
          <input type="file" className="form-control" onChange={handleFileChange} />
        </div>

        <button type="submit" className="btn btn-primary mt-3">Add Subcategory</button>
      </form>
    </div>
  );
}

export default AddSubcategory;
