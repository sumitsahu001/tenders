import axios from "axios";
import { useState, useEffect } from "react";
import { __categoryapiurl } from "./API_URL";

function Addcategory() {
  const [file, setFile] = useState(null);
  const [catName, setCatName] = useState("");
  const [output, setOutput] = useState("");

  const handleChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!catName || !file) {
      setOutput("Please fill in all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("catnm", catName);
    formData.append("caticon", file);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      const response = await axios.post(__categoryapiurl + "save", formData, config);
      console.log("Server Response:", response.data);

      // Reset input fields
      setCatName("");
      setFile(null);
      setOutput("Category Added Successfully!");
    } catch (error) {
      console.error("Error:", error);
      setOutput("Failed to add category. Please try again.");
    }
  };

  useEffect(() => {
    if (output) {
      const timer = setTimeout(() => setOutput(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [output]);

  return (
    <>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="card shadow-lg border-0">
              <div className="card-header bg-primary text-white text-center">
                <h3 className="mb-0">Add Category</h3>
              </div>
              <div className="card-body">
                {output && <p className={`text-center ${output.includes("Failed") ? "text-danger" : "text-success"}`}>{output}</p>}

                <form>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Category Name:</label>
                    <input
                      type="text"
                      className="form-control"
                      value={catName}
                      onChange={(e) => setCatName(e.target.value)}
                      placeholder="Enter category name"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-bold">Category Icon:</label>
                    <input type="file" className="form-control" onChange={handleChange} />
                  </div>

                  <div className="text-center">
                    <button onClick={handleSubmit} type="button" className="btn btn-primary w-100">
                      Add Category
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Addcategory;
