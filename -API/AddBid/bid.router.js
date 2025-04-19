import express from "express";
import * as BidController from "./bid.controller.js"; 

const router = express.Router();

// ✅ Routes
router.post("/save", BidController.save);
router.get("/fetch", BidController.fetch);

export default router;
