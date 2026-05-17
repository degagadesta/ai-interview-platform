const express = require("express");
const router = express.Router();
const interviewController = require("../controllers/interview.controller");
const { validateInterview, validateInterviewId } = require("../validators/interview.validator");
const { authenticateUser, authorizeUser } = require("../../../middleware/auth.middleware");

router.use(authenticateUser);

router.post("/", authorizeUser(["ADMIN", "INTERVIEWER"]), validateInterview, interviewController.scheduleInterview);
router.put("/:id", authorizeUser(["ADMIN", "INTERVIEWER"]), validateInterview, validateInterviewId, interviewController.updateInterview);

router.get("/my", interviewController.getMyInterviews);
router.get("/:id", validateInterviewId, interviewController.getInterview);

module.exports = router;
