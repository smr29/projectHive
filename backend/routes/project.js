const express = require("express");
const {
  addProject,
  editProject,
  viewUserProjects,
  viewAllProjects,
  filterProjects,
} = require("../controllers/projectController");

const router = express.Router();

router.post("/add", addProject);
router.put("/edit", editProject);
router.get("/user/:userId", viewUserProjects);
router.get("/all", viewAllProjects);
router.get("/filter", filterProjects);

module.exports = router;
