import url from "url";
import path from "path";
import rs from "randomstring";
import fs from "fs";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

import CategorySchemaModel from "./category.model.js";

export const save = async (req, res) => {
  try {
    var cList = await CategorySchemaModel.find();
    var l = cList.length;
    var _id = l === 0 ? 1 : cList[l - 1]._id + 1;

    if (!req.files || !req.files.caticon) {
      return res.status(400).json({ status: false, message: "Category icon is required" });
    }

    var caticon = req.files.caticon;
    var caticonnm = rs.generate() + "-" + Date.now() + "-" + caticon.name;
    
    var dirPath = path.join(__dirname, "../public/assets/uploads/caticons");
    var filepath = path.join(dirPath, caticonnm);
    console.log("Saving file to:", filepath);


    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    const cDetails = { ...req.body, _id, caticonnm };
    await CategorySchemaModel.create(cDetails);

    caticon.mv(filepath, (err) => {
      if (err) {
        console.error("File move error:", err);
        return res.status(500).json({ status: false, message: "Error saving file" });
      }
    });

    res.status(201).json({ status: true, message: "Category added successfully" });

  } catch (error) {
    console.error("Error saving category:", error);
    res.status(500).json({ status: false, message: "Error while saving category, try again" });
  }
};

export const fetch = async (req, res) => {
  try {
    let categories = await CategorySchemaModel.find(); 
    if (categories.length !== 0) {
      res.status(200).json(categories);
    } else {
      res.status(404).json({ status: false, message: "No categories found" });
    }
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ status: false, message: "Server error" });
  }
};


export const deleteCategory = async (req, res) => {
  try {
    let cDetails = await CategorySchemaModel.findOne(JSON.parse(req.body.condition_obj));
    if (cDetails) {
      await CategorySchemaModel.deleteOne(JSON.parse(req.body.condition_obj));
      res.status(200).json({ status: true, message: "Category deleted successfully" });
    } else {
      res.status(404).json({ status: false, message: "Category not found" });
    }
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ status: false, message: "Server error" });
  }
};

export const updateCategory = async (req, res) => {
  try {
    let cDetails = await CategorySchemaModel.findOne(JSON.parse(req.body.condition_obj));
    if (cDetails) {
      await CategorySchemaModel.updateOne(JSON.parse(req.body.condition_obj), { $set: JSON.parse(req.body.content_obj) });
      res.status(200).json({ status: true, message: "Category updated successfully" });
    } else {
      res.status(404).json({ status: false, message: "Category not found" });
    }
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({ status: false, message: "Server error" });
  }
};
