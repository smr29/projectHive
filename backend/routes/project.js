import express from "express";
import {
  createProject,
  joinProject,
  editProject,
  viewAllProjects,
  viewUserProjects,
  filterProjects,
} from "../controllers/projectController.js";

const router = express.Router();

router.post("/create", createProject);
router.post("/join", joinProject);
router.patch("/edit/:projectId", editProject);
router.get("/all", viewAllProjects);
router.get("/get-all", viewUserProjects);
router.get("/filter", filterProjects);

export default router;
