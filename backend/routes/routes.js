import express from "express";
import { viewUserProjects } from "./controller/projectController.js";
import { authenticate } from "./middleware.js"; // Import authenticate middleware

const router = express.Router();

// Protected route to view user's projects
router.get("/projects", authenticate, viewUserProjects);

export default router;
