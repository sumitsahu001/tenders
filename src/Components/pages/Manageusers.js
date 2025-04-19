import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:3001/user/";

function Manageusers() {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(API_URL + "fetch");
      setUserDetails(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const changeStatus = async (_id, currentStatus) => {
    try {
      const newStatus = !currentStatus; // Toggle status
      await axios.patch(API_URL + "update", { _id, status: newStatus });
      alert(`User ${newStatus ? "verified" : "blocked"} successfully.`);
      fetchUsers();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const deleteUser = async (_id) => {
    try {
      await axios.delete(API_URL + "delete", { data: { _id } });
      alert("User deleted successfully.");
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="container-fluid bg-secondary p-0">
      <div className="row g-0">
        <div className="col-lg-12 py-6 px-5">
          <h1 className="display-5 mb-4 fw-bold">
            View & Manage <span className="text-primary">Users Here!!!</span>
          </h1>
          <table className="table table-bordered" cellPadding="20px">
            <thead>
              <tr>
                <th>RegID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Address</th>
                <th>City</th>
                <th>Gender</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {userDetails.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.mobile}</td>
                  <td>{user.address}</td>
                  <td>{user.city}</td>
                  <td>{user.gender}</td>
                  <td>
                    {user.status ? (
                      <span style={{ color: "green" }}>Verified</span>
                    ) : (
                      <span style={{ color: "red" }}>Blocked</span>
                    )}
                  </td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => changeStatus(user._id, user.status)}
                    >
                      Change Status
                    </button>
                    &nbsp;
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteUser(user._id)}
                    >
                      DELETE
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Manageusers;
