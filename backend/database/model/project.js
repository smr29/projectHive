import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  subject: { type: String, required: true },
  code: { type: String, unique: true, required: true }, 
  project_status: { type: String, required: true }, 
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], 
  createdAt: { type: Date, default: Date.now },
});

const Project = mongoose.model("Project", projectSchema);
export default Project;
