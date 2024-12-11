const express = require("express");
const { createTeam, joinTeam } = require("../controllers/teamController");

const router = express.Router();

router.post("/create", createTeam);
router.post("/join", joinTeam);

module.exports = router;
