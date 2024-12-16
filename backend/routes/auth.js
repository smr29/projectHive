import express from "express"; // Correct default import for express
import logout from "../controllers/signin.js"; // Add `.js` extensions for ES modules
import signup from "../controllers/signup.js";
import signin from "../controllers/signin.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
});

export default router;
