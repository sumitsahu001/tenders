import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function AddBid() {
  const { subcategoryId } = useParams(); // From ViewSubcategory route
  const navigate = useNavigate();
  const [bidAmount, setBidAmount] = useState("");
  const [output, setOutput] = useState("");
  const [productDetails, setProductDetails] = useState({});
  const [currentPrice, setCurrentPrice] = useState(null);

  // Fetch product and current bid price on load
  useEffect(() => {
    // Fetch product details (assuming subcategoryId is p_id)
    axios
      .get(`http://localhost:3001/product/fetch?_id=${subcategoryId}`)
      .then((response) => {
        setProductDetails(response.data[0] || {});
      })
      .catch((error) => setOutput("Error loading product details"));

    // Fetch highest bid price
    axios
      .get(`http://localhost:3001/bid/fetch?p_id=${subcategoryId}`)
      .then((response) => {
        if (response.data.length > 0) {
          const maxBid = Math.max(...response.data.map((bid) => bid.bidprice));
          setCurrentPrice(maxBid);
        } else {
          setCurrentPrice(productDetails.baseprice || 0);
        }
      })
      .catch(() => setCurrentPrice(productDetails.baseprice || 0));
  }, [subcategoryId, productDetails.baseprice]);

  // Handle bid submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!bidAmount || isNaN(bidAmount) || bidAmount <= currentPrice) {
      setOutput("❌ Enter a valid bid higher than the current price!");
      return;
    }

    const bidDetails = {
      p_id: subcategoryId,
      u_id: localStorage.getItem("email"),
      bidprice: Number(bidAmount),
    };

    try {
      await axios.post("http://localhost:3001/bid/save", bidDetails);
      setOutput("✅ Bid placed successfully!");
      setBidAmount("");
      navigate(`/add-bid/${subcategoryId}`); 
    } catch (error) {
      setOutput("❌ Bid failed. Try again!");
    }
  };

  return (
    <div className="container-fluid bg-gradient py-5" style={{ background: "linear-gradient(135deg, #f8f9fa, #e9ecef)" }}>
      <div className="container">
        <h1 className="text-center text-danger mb-4 animate__animated animate__bounceIn">
          🎉 Bid Like a Pro! 🎉
        </h1>
        <p className="text-center text-primary fw-bold">{output}</p>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow-lg border-0 rounded-3 p-4 bg-white animate__animated animate__fadeInUp">
              <h3 className="card-title text-center text-dark mb-4">
                Bid on: <span className="text-success">{productDetails.name || "Tender Item"}</span>
              </h3>
              <div className="text-center mb-3">
                <p className="fw-bold text-muted">Base Price: ₹{productDetails.baseprice || "N/A"}</p>
                <p className="fw-bold text-info">Current Highest Bid: ₹{currentPrice || "No bids yet"}</p>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-bold text-dark">Your Bid Amount:</label>
                  <input
                    type="number"
                    className="form-control border-dark shadow-sm"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    placeholder="Enter amount"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-danger w-100 fw-bold shadow-lg animate__animated animate__pulse animate__infinite"
                >
                  🚀 Place Bid Now!
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddBid;