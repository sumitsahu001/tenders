import UserSchemaModel from "./user.model.js";
import jwt from "jsonwebtoken";
import rs from "randomstring";

// Register a new user
export const save = async (req, res) => {
    try {
        const userDetails = {
            ...req.body,
            role: req.body.role || "user",
            status: 0,
            info: new Date(),
        };

        await UserSchemaModel.create(userDetails);
        res.status(201).json({ status: true, message: "User registered successfully!" });
    } catch (error) {
        console.error("Error saving user:", error);
        res.status(500).json({ status: false, message: "An error occurred while saving user data." });
    }
};

// Login User
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserSchemaModel.findOne({ email, status: 1 });

        if (!user) {
            return res.status(404).json({ message: "User not found or not verified" });
        }
        if (user.password !== password) {
            return res.status(401).json({ message: "Invalid password" });
        }

        // Send user details without JWT
        res.status(200).json({ message: "Login successful", userDetails: user });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "An error occurred during login" });
    }
};

// Fetch users with optional filters
export const fetch = async (req, res) => {
    try {
        const condition = req.query.condition_obj ? JSON.parse(req.query.condition_obj) : {};
        const users = await UserSchemaModel.find(condition);

        if (users.length > 0) {
            res.status(200).json(users);
        } else {
            res.status(404).json({ status: "Resource not found" });
        }
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Failed to fetch users" });
    }
};

// Update user details
export const update = async (req, res) => {
    try {
        const { condition_obj, content_obj } = req.body;
        const user = await UserSchemaModel.findOne(condition_obj);

        if (user) {
            await UserSchemaModel.updateOne(condition_obj, { $set: content_obj });
            res.status(200).json({ msg: "User updated successfully" });
        } else {
            res.status(404).json({ status: "Requested resource not available" });
        }
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "An error occurred while updating user details" });
    }
};

// Delete user
export const deleteUser = async (req, res) => {
    try {
        const user = await UserSchemaModel.findOne(req.body);

        if (user) {
            await UserSchemaModel.deleteOne(req.body);
            res.status(200).json({ msg: "User deleted successfully" });
        } else {
            res.status(404).json({ status: "Requested resource not available" });
        }
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: "An error occurred while deleting the user." });
    }
};
