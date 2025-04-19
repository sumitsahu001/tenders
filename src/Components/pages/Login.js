import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login({ setRole }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const apiurl = "http://localhost:3001/user/login";


  const validate = () => {
    let newErrors = {};
    if (!email.match(/^\S+@\S+\.\S+$/)) newErrors.email = "Invalid email format";
    if (password.length < 5) newErrors.password = "Password must be at least 5 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const loginDetails = { email, password };

    try {
      const response = await axios.post(apiurl, loginDetails, {
        headers: { "Content-Type": "application/json" },
      });

      alert(response.data.message);
      console.log("Logged in user:", response.data.userDetails);

      const userRole = response.data.userDetails.role;
      localStorage.setItem("role", userRole);
      localStorage.setItem("user", JSON.stringify(response.data.userDetails)); 

      setRole(userRole);
      setEmail("");
      setPassword("");

      userRole === "admin" ? navigate("/admin") : navigate("/user");
    } catch (error) {
      if (error.response) {
        setErrors({ api: error.response.data.message });
      } else {
        console.error("Login error:", error);
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email address:</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <small className="text-danger">{errors.email}</small>}
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <small className="text-danger">{errors.password}</small>}
        </div>

        {errors.api && <p className="text-danger">{errors.api}</p>}
        
        <br />
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
}

export default Login;
