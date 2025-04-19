import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const CategorySchema = mongoose.Schema({
  _id: {
    type: Number,
    required: true,
    unique: true,
  },
  catnm: {
    type: String,
    required: [true, "Category name is required"],
    lowercase: true,
    trim: true,
    unique: true,
  },
  caticonnm: {
    type: String,
    required: [true, "Category icon name is required"],
    trim: true,
  },
});

// Apply the uniqueValidator plugin to enforce unique constraints
CategorySchema.plugin(uniqueValidator);

// Compile the schema into a model
const CategorySchemaModel = mongoose.model("category_collection", CategorySchema);

export default CategorySchemaModel;
