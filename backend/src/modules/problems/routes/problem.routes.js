const express = require("express")
const { createProblem, getProblemById, getProblems, updateProblem, deleteProblem } = require("../controllers/problem.controller")
const { validateProblem, validateProblemId } = require("../validators/problem.validator")
const { authenticateUser } = require("../../../middleware/auth.middleware")
const { authorizeUser } = require("../../../middleware/auth.middleware")

const router = express.Router()
router.post("/", authenticateUser, authorizeUser(["ADMIN", "INTERVIEWER"]), validateProblem, createProblem)
router.get("/:id", validateProblemId, getProblemById)
router.get("/", getProblems)
router.put("/:id", authenticateUser, authorizeUser(["ADMIN", "INTERVIEWER"]), validateProblemId, validateProblem, updateProblem)
router.delete("/:id", authenticateUser, authorizeUser(["ADMIN", "INTERVIEWER"]), validateProblemId, deleteProblem)

module.exports = router