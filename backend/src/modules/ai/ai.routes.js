const express = require("express");
const { getFeedback, getCodeSuggestions } = require("./ai.controller");
const { authenticateUser } = require("../../middleware/auth.middleware");

const router = express.Router();

router.post("/feedback", authenticateUser, getFeedback);
router.post("/suggestions", authenticateUser, getCodeSuggestions);

module.exports = router;
