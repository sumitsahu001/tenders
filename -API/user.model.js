import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mobile: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  gender: { type: String, required: true },
  role: { type: String, required: true, default: 'user' },
  status:{type:Boolean},
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
