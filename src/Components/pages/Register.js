import React, { useState } from "react";
import axios from "axios";
import cities from "./cities.json"; // Import the JSON file

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [gender, setGender] = useState("");
  const [role, setRole] = useState("user"); 
  const [errors, setErrors] = useState({});

  const apiurl = "http://localhost:3001/user/register";

  const validate = () => {
    let newErrors = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.match(/^\S+@\S+\.\S+$/)) newErrors.email = "Invalid email format";
    if (password.length < 5) newErrors.password = "Password must be at least 5 characters";
    if (!mobile.match(/^[6-9]\d{9}$/)) newErrors.mobile = "Invalid mobile number";
    if (!address.trim()) newErrors.address = "Address is required";
    if (!city) newErrors.city = "Please select a city";
    if (!gender) newErrors.gender = "Gender is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validate()) return;

    const userDetails = { name, email, password, mobile, address, city, gender, role };
    axios
      .post(apiurl, userDetails)
      .then(() => {
        alert("Successfully registered");
        setName(""); setEmail(""); setPassword(""); setMobile(""); setAddress(""); setCity(""); setGender("");
        setErrors({});
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" className="form-control" onChange={(e) => setName(e.target.value)} value={name} />
          {errors.name && <small className="text-danger">{errors.name}</small>}
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input type="email" className="form-control" onChange={(e) => setEmail(e.target.value)} value={email} />
          {errors.email && <small className="text-danger">{errors.email}</small>}
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input type="password" className="form-control" onChange={(e) => setPassword(e.target.value)} value={password} />
          {errors.password && <small className="text-danger">{errors.password}</small>}
        </div>

        <div className="form-group">
          <label>Mobile:</label>
          <input type="text" className="form-control" onChange={(e) => setMobile(e.target.value)} value={mobile} />
          {errors.mobile && <small className="text-danger">{errors.mobile}</small>}
        </div>

        <div className="form-group">
          <label>Address:</label>
          <textarea rows="5" className="form-control" onChange={(e) => setAddress(e.target.value)} value={address}></textarea>
          {errors.address && <small className="text-danger">{errors.address}</small>}
        </div>

        <div className="form-group">
          <label>City:</label>
          <select className="form-control" onChange={(e) => setCity(e.target.value)} value={city}>
            <option value="">Select City</option>
            {Object.values(cities)[0].map((cityName, index) => (
              <option key={index} value={cityName}>{cityName}</option>
            ))}
          </select>
          {errors.city && <small className="text-danger">{errors.city}</small>}
        </div>

        <div className="form-group">
          <label>Gender:</label><br />
          <input type="radio" value="male" name="gender" onChange={(e) => setGender(e.target.value)} checked={gender === "male"} /> Male
          <input type="radio" value="female" name="gender" onChange={(e) => setGender(e.target.value)} checked={gender === "female"} /> Female
          {errors.gender && <small className="text-danger">{errors.gender}</small>}
        </div>

        <button type="submit" className="btn btn-success">Submit</button>
      </form>
    </>
  );
}

export default Register;
