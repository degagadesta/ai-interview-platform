const express = require("express");
const router = express.Router();
const submissionController = require("../controllers/submission.controller");
const { validateSubmission, validateSubmissionId } = require("../validators/submission.validator");
const { authenticateUser, authorizeUser } = require("../../../middleware/auth.middleware");

router.use(authenticateUser);

router.post("/", validateSubmission, submissionController.submitCode);
router.get("/my", submissionController.getMySubmissions);
router.get("/:id", validateSubmissionId, submissionController.getSubmission);
router.get("/", authorizeUser(["ADMIN", "INTERVIEWER"]), submissionController.listAllSubmissions);

module.exports = router;
