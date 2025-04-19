import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const BidSchema = mongoose.Schema({
  _id: { type: Number, required: true, unique: true }, 
  p_id: { type: Number, required: true },      
  bidprice: { type: Number, required: true },  
  u_id: { type: String, required: true },      
  info: { type: Date, default: Date.now }       
}, { timestamps: true });

BidSchema.plugin(uniqueValidator);

const BidSchemaModel = mongoose.model("bid_collections", BidSchema);
export default BidSchemaModel;
