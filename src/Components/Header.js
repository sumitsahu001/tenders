import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpeg";

function Header({ setContentText }) {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState(localStorage.getItem("role") || "");

  useEffect(() => {
    const updateRole = () => {
      const role = localStorage.getItem("role") || "";
      setUserRole(role);
    };

    window.addEventListener("storage", updateRole);
    return () => {
      window.removeEventListener("storage", updateRole);
    };
  }, []);

  useEffect(() => {
    const role = localStorage.getItem("role") || "";
    setUserRole(role);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    setUserRole("");  // Force update state
    navigate("/login"); // Redirect after logout
  };

  return (
    <header className={`text-light ${userRole === "admin" ? "bg-info" : userRole === "user" ? "bg-primary" : "bg-warning"}`}>
      <div className="container py-3">
        <div className="d-flex justify-content-between align-items-center">
          <img src={logo} alt="Logo" className="p-0" />
          <h1>{userRole === "admin" ? "Tenders Management Portal" : userRole === "user" ? "Welcome, User" : "Welcome to the Portal"}</h1>
          <nav className="navbar navbar-expand-lg">
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                {userRole === "user" && (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link fs-4" to="/user">
                        Home
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link fs-4" to="/dashboard">
                        Dashboard
                      </Link>
                    </li>
                  </>
                )}

                {userRole && (
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle fs-4" href="#" role="button" data-bs-toggle="dropdown">
                      Account
                    </a>
                    <ul className="dropdown-menu fs-5">
                      <li>
                        <Link className="dropdown-item" to={userRole === "admin" ? "/update-profile" : "/update-profile-user"}>
                          Edit Profile
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to={userRole === "admin" ? "/change-password" : "/change-password-user"}>
                          Change Password
                        </Link>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <button className="dropdown-item text-danger" onClick={handleLogout}>
                          Logout
                        </button>
                      </li>
                    </ul>
                  </li>
                )}

                {!userRole && (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link fs-4" to="/register">
                        Register
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link fs-4" to="/login">
                        Login
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
