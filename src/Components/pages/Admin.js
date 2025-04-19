import React, { useState } from "react";
import Manageusers from "./Manageusers";
import Addcategory from "./Addcategory";
import Addsubcategory from "./Addsubcategory"; 

function Admin() {
  const [showManageUsers, setShowManageUsers] = useState(false);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showAddsubcategory, setShowAddsubcategory] = useState(false);

  return (
    <div className="container-fluid bg-light min-vh-100 py-4">
      <div className="container">
        <h1 className="text-center text-primary mb-4">Government Tenders - Admin Panel</h1>

        <div className="card shadow-lg border-0">
          <div className="card-header bg-primary text-white">
            <h2 className="mb-0">Dashboard</h2>
          </div>
          <div className="card-body">
            <ul className="list-group list-group-flush">
              <li 
                className="list-group-item text-primary" 
                style={{ cursor: "pointer" }} 
                onClick={() => { 
                  setShowManageUsers(true); 
                  setShowAddCategory(false);
                  setShowAddsubcategory(false);
                }}
              >
                📌 <strong>Manage Users</strong>
              </li>

              <li 
                className="list-group-item text-primary" 
                style={{ cursor: "pointer" }} 
                onClick={() => { 
                  setShowAddCategory(true); 
                  setShowManageUsers(false);
                  setShowAddsubcategory(false);
                }}
              >
                ➕ <strong>Add Category</strong>
              </li>

              <li 
                className="list-group-item text-primary" 
                style={{ cursor: "pointer" }} 
                onClick={() => { 
                  setShowAddsubcategory(true); 
                  setShowManageUsers(false);
                  setShowAddCategory(false);
                }}
              >
                📂 <strong>Add Subcategory</strong>
              </li>
            </ul>
          </div>
        </div>

        {showManageUsers && <Manageusers />}
        {showAddCategory && <Addcategory />}
        {showAddsubcategory && <Addsubcategory />}
      </div>
    </div>
  );
}

export default Admin;