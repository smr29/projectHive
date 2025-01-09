import express from "express";
import { viewUserProjects } from "./controller/projectController.js";
import { authenticate } from "./middleware.js";

const router = express.Router();

router.get("/projects", authenticate, viewUserProjects);

export default router;
