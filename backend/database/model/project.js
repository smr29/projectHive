import { mongoose } from "mongoose";
const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  subject: { type: String, required: true },
  status: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});
const Project = mongoose.model("project", projectSchema);

export default Project;
