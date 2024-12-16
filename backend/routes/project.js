import express from "express"; 
import {
  addProject,
  editProject,
  viewUserProjects,
  viewAllProjects,
  filterProjects,
} from "../controllers/projectController.js"

const router = express.Router();

router.post("/add", addProject);
router.put("/edit", editProject);
router.get("/user/:userId", viewUserProjects);
router.get("/all", viewAllProjects);
router.get("/filter", filterProjects);

export default router;
