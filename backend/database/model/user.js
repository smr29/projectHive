import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  usn: { 
    type: String, 
    unique: true, 
    required: true, 
    uppercase: true,
    trim: true 
  },
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);
export default User;
