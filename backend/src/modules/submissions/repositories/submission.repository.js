const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function createSubmission(submissionData) {
    return await prisma.submission.create({
        data: submissionData,
        include: {
            problem: {
                select: {
                    title: true,
                    difficulty: true
                }
            }
        }
    });
}

async function getSubmissionById(id) {
    return await prisma.submission.findUnique({
        where: { id },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            },
            problem: true
        }
    });
}

async function getSubmissions(filters = {}) {
    return await prisma.submission.findMany({
        where: filters,
        orderBy: {
            createdAt: 'desc'
        },
        include: {
            problem: {
                select: {
                    title: true
                }
            }
        }
    });
}

async function updateSubmissionStatus(id, status, result) {
    return await prisma.submission.update({
        where: { id },
        data: {
            status,
            result
        }
    });
}

module.exports = {
    createSubmission,
    getSubmissionById,
    getSubmissions,
    updateSubmissionStatus
};
