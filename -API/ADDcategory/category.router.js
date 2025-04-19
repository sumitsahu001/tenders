import express from "express";
const router = express.Router();

// Import the category controller
import * as CategoryController from "./category.controller.js";

// Define routes for category operations
router.post("/save", CategoryController.save);

router.get("/fetch", CategoryController.fetch);

router.delete("/delete", CategoryController.deleteCategory);

router.patch("/update", CategoryController.updateCategory);

export default router;
