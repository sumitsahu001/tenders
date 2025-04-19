import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout({ setRole }) {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    setRole("");  
    navigate("/login"); 
  }, [navigate]);

  return null;
}

export default Logout;
