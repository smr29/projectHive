const mongoose = require("mongoose");

const teamSchema = mongoose.Schema({
  name: String,
  code: { type: String, unique: true }, 
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: "project" }], 
});

const Team = mongoose.model("team", teamSchema);
module.exports = Team;
