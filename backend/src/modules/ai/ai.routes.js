const express = require("express");
const { getFeedback } = require("./ai.controller");
const { authenticateUser } = require("../../middleware/auth.middleware");

const router = express.Router();

router.post("/feedback", authenticateUser, getFeedback);

module.exports = router;
