const express = require("express");

const login = require("../controllers/signin");
const signup = require("../controllers/signup");
const signin = require("../controllers/signin");

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
});
module.exports = router;