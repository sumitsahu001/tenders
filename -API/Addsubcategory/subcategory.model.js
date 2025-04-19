import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const subCategorySchema = new mongoose.Schema({
  _id: Number,
  catnm: {
    type: String,
    required: [true, "Category name is required"],
    lowercase: true,
    trim: true,
  },
  subcatnm: {
    type: String,
    required: [true, "Sub Category name is required"],
    lowercase: true,
    trim: true,
   
  },
  subcaticonm: {
    type: String,
    required: [true, "Sub Category icon name is required"],
    trim: true,
  },
});

subCategorySchema.plugin(uniqueValidator);

const subCategorySchemaModel = mongoose.model("subcategory_collection", subCategorySchema);

export default subCategorySchemaModel;
