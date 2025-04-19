import mongoose from "mongoose";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import fileUpload from "express-fileupload";
import path from "path";
import { fileURLToPath } from "url";

import userRouter from "./user.router.js";
import categoryRouter from "./ADDcategory/category.router.js";
import subcategoryRouter from "./Addsubcategory/subcategory.router.js";
import bidRouter from "./AddBid/bid.router.js";  

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

// ✅ Middleware
app.use(cors());
app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ✅ Static file serving
app.use("/assets/uploads/caticons", express.static(path.join(__dirname, "public/assets/uploads/caticons")));
app.use("/assets/uploads/subcaticons", express.static(path.join(__dirname, "public/assets/uploads/subcaticons")));

// ✅ Database Connection
mongoose.connect("mongodb://localhost:27017/registrationDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch(error => {
  console.error("❌ Database connection error:", error);
  process.exit(1);
});

// ✅ Routes
app.use("/user", userRouter);
app.use("/category", categoryRouter);
app.use("/subcategory", subcategoryRouter);
app.use("/bid", bidRouter);

// ✅ Global Error Handler
app.use((err, req, res, next) => {
  console.error("🔥 Error:", err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
