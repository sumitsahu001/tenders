import express from "express";
import { save, login, fetch, update, deleteUser } from "./usercontroller.js";

const router = express.Router();

router.post("/register", save); // Register user
router.post("/login", login); // User login
router.get("/fetch", fetch); // Fetch users
router.patch("/update", update); // Update user
router.delete("/delete", deleteUser); // Delete user

export default router;
