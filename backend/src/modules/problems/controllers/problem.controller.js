const { createProblem: createProblemService, getProblemById: getProblemByIdService, getProblems: getProblemsService, updateProblem: updateProblemService, deleteProblem: deleteProblemService } = require("../services/problem.service")
async function createProblem(req, res, next) {
    try {
        const problem = await createProblemService(req.body)
        return res.status(201).json({
            success: true,
            message: "Problem created successfully",
            data: problem
        })
    } catch (error) {
        next(error)
    }
}
async function getProblemById(req, res, next) {
    try {
        const id = req.params.id
        const problem = await getProblemByIdService(id)
        return res.status(200).json({
            success: true,
            message: "Problem fetched successfully",
            data: problem
        })
    } catch (error) {
        next(error)
    }
}
async function getProblems(req, res, next) {
    try {
        const problems = await getProblemsService()
        return res.status(200).json({
            success: true,
            message: "Problems fetched successfully",
            data: problems
        })
    } catch (error) {
        next(error)
    }
}
async function updateProblem(req, res, next) {
    try {
        const id = req.params.id
        const problem = await updateProblemService(id, req.body)
        return res.status(200).json({
            success: true,
            message: "Problem updated successfully",
            data: problem
        })
    } catch (error) {
        next(error)
    }
}
async function deleteProblem(req, res, next) {
    try {
        const id = req.params.id
        const problem = await deleteProblemService(id)
        return res.status(200).json({
            success: true,
            message: "Problem deleted successfully",
            data: problem
        })
    } catch (error) {
        next(error)
    }
}
module.exports = { createProblem, getProblemById, getProblems, updateProblem, deleteProblem }    