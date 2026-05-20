const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function createProblem(problemData) {
    return await prisma.problem.create({
        data: problemData
    });
}

async function getProblemById(id) {
    return await prisma.problem.findUnique({
        where: { id }
    });
}

async function getProblems(filters = {}) {
    return await prisma.problem.findMany({
        where: filters
    });
}

async function getProblemsBySlug(slug) {
    return await prisma.problem.findUnique({
        where: { slug }
    });
}

async function updateProblem(id, problemData) {
    return await prisma.problem.update({
        where: { id },
        data: problemData
    });
}

async function deleteProblem(id) {
    return await prisma.problem.delete({
        where: { id }
    });
}

module.exports = {
    createProblem,
    getProblemById,
    getProblems,
    getProblemsBySlug,
    updateProblem,
    deleteProblem
};
