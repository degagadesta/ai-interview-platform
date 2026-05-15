const { createProblem: createProblemRepo, getProblemById: getProblemByIdRepo, getProblems: getProblemsRepo, updateProblem: updateProblemRepo, deleteProblem: deleteProblemRepo, getProblemsBySlug: getProblemsBySlugRepo } = require("./problem.repository")
async function createProblem(problemData) {
    try {
        const { title, description, difficulty, category, slug, tags, hint, templateCode } = problemData
        const existingProblem = await getProblemsBySlugRepo(slug)
        if (existingProblem) {
            throw new Error("Problem already exists with this slug")
        }
        const newProblem = await createProblemRepo({ title, description, difficulty, category, slug, tags, hint, templateCode })
        return newProblem
    } catch (error) {
        throw error
    }
}
async function getProblemById(id) {
    try {
        const problem = await getProblemByIdRepo(id)
        if (!problem) {
            throw new Error("Problem not found")
        }
        return problem
    } catch (error) {
        throw error
    }

}
async function getProblems() {
    try {
        const problems = await getProblemsRepo()
        return problems
    } catch (error) {
        throw error
    }

}
async function updateProblem(id, problemData) {
    try {
        const problem = await updateProblemRepo(id, problemData)
        return problem
    } catch (error) {
        throw error
    }
}
async function deleteProblem(id) {
    try {
        const problem = await deleteProblemRepo(id)
        return problem
    } catch (error) {
        throw error
    }
}
module.exports = { createProblem, getProblemById, getProblems, updateProblem, deleteProblem }