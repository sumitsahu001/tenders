import mongoose from "mongoose"; 
import url from "url";
import path from "path";
import rs from "randomstring";
import subCategorySchemaModel from "./subcategory.model.js";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

export const save = async (req, res) => {
  try {
    var scList = await subCategorySchemaModel.find();
    var l = scList.length;
    var _id = l === 0 ? 1 : scList[l - 1]._id + 1;

    if (!req.files || !req.files.caticon) {
      console.error("❌ No file uploaded");
      return res.status(400).json({ "status": false, "message": "No file uploaded" });
    }

    var caticon = req.files.caticon;
    var subcaticonm = rs.generate() + "-" + Date.now() + "-" + caticon.name;
    var filepath = path.join(__dirname, "../public/assets/uploads/subcaticons", subcaticonm);

    console.log("📂 File Path:", filepath);

    const scDetails = { ...req.body, "_id": _id, "subcaticonm": subcaticonm };

    if (!scDetails.subcaticonm) {
      console.error("❌ Sub Category icon name is required");
      return res.status(400).json({ "status": false, "message": "Sub Category icon name is required" });
    }

    await subCategorySchemaModel.create(scDetails);
    caticon.mv(filepath, (err) => {
      if (err) {
        console.error("❌ File move failed:", err);
        return res.status(500).json({ status: false, message: "File move error" });
      }
      console.log("✅ Subcategory added successfully");
      res.status(201).json({ status: true, message: "Subcategory added successfully" });
    });

  } catch (error) { 
    console.error("❌ Error saving subcategory:", error);
    res.status(500).json({ status: false, message: "Server error", error: error.message });
  }
};

export const fetch = async (req, res) => {
  try {
    var condition_obj = req.query.condition_obj ? JSON.parse(req.query.condition_obj) : {};
    console.log("🔍 Fetch Condition:", condition_obj);

    var subcategories = await subCategorySchemaModel.find(condition_obj);
    
    if (subcategories.length !== 0) {
      res.status(200).json(subcategories);
    } else {
      res.status(404).json({ "status": "Resource not found" });
    }
  } catch (error) {
    console.error("❌ Error fetching subcategories:", error);
    res.status(500).json({ "status": "Server error", "error": error.message });
  }
};

export const deleteSubcategory = async (req, res) => {
  try {
    let condition = JSON.parse(req.body.condition_obj);
    console.log("🗑 Delete Condition:", condition);

    let subcategory = await subCategorySchemaModel.findOne(condition);
    if (subcategory) {
      await subCategorySchemaModel.deleteOne(condition);
      console.log("✅ Subcategory deleted successfully");
      res.status(200).json({ "msg": "Subcategory deleted successfully" });
    } else {
      res.status(404).json({ "status": "Requested resource not available" });
    }
  } catch (error) {
    console.error("❌ Error deleting subcategory:", error);
    res.status(500).json({ "status": "Server error", "error": error.message });
  }
};

export const update = async (req, res) => {
  try {
    let condition = JSON.parse(req.body.condition_obj);
    let content = JSON.parse(req.body.content_obj);
    console.log("🔄 Update Condition:", condition);
    console.log("📝 Update Content:", content);

    let subcategory = await subCategorySchemaModel.findOne(condition);
    if (subcategory) {
      await subCategorySchemaModel.updateOne(condition, { $set: content });
      console.log("✅ Subcategory updated successfully");
      res.status(200).json({ "msg": "Subcategory updated successfully" });
    } else {
      res.status(404).json({ "status": "Requested resource not available" });
    }
  } catch (error) {
    console.error("❌ Error updating subcategory:", error);
    res.status(500).json({ "status": "Server error", "error": error.message });
  }
};
