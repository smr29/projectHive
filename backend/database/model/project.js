const mongoose = require("mongoose");

const projectSchema = mongoose.Schema({
  title: String,
  description: String,
  subject: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  team: { type: mongoose.Schema.Types.ObjectId, ref: "team" },
});

const Project = mongoose.model("project", projectSchema);
module.exports = Project;
