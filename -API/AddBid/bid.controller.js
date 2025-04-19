import BidSchemaModel from "./bid.model.js";

export const save = async (req, res) => {
  try {
    const { p_id, bidprice, u_id } = req.body;

    // Check if fields are valid
    if (!p_id || isNaN(p_id) || !bidprice || isNaN(bidprice) || !u_id) {
      return res.status(400).json({ status: false, message: "Missing or invalid fields" });
    }

    // Get last bid ID
    const lastBid = await BidSchemaModel.findOne().sort({ _id: -1 });
    const _id = lastBid ? lastBid._id + 1 : 1;

    // Create bid
    const bidDetails = {
      _id,
      p_id: Number(p_id),
      bidprice: Number(bidprice),
      u_id,
      info: new Date(),
    };

    await BidSchemaModel.create(bidDetails);
    res.status(201).json({ status: true, message: "Bid submitted successfully!" });
  } catch (error) {
    res.status(500).json({ status: false, message: "Error submitting bid", error: error.message });
  }
};

export const fetch = async (req, res) => {
  try {
    // Handle p_id query instead of condition_obj for simplicity
    const { p_id } = req.query;
    const condition = p_id ? { p_id: Number(p_id) } : {};

    const bidList = await BidSchemaModel.find(condition);
    if (bidList.length > 0) {
      res.status(200).json(bidList);
    } else {
      res.status(404).json({ status: false, message: "No bids found" });
    }
  } catch (error) {
    res.status(500).json({ status: false, message: "Error fetching bids", error: error.message });
  }
};