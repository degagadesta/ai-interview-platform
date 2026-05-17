const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function createInterview(interviewData) {
    const { problemIds, ...rest } = interviewData;
    return await prisma.interview.create({
        data: {
            ...rest,
            problems: {
                connect: problemIds.map(id => ({ id }))
            }
        },
        include: {
            problems: true,
            candidate: { select: { name: true, email: true } },
            interviewer: { select: { name: true, email: true } }
        }
    });
}

async function getInterviewById(id) {
    return await prisma.interview.findUnique({
        where: { id },
        include: {
            problems: true,
            candidate: { select: { id: true, name: true, email: true } },
            interviewer: { select: { id: true, name: true, email: true } }
        }
    });
}

async function getInterviews(filters = {}) {
    return await prisma.interview.findMany({
        where: filters,
        orderBy: { scheduledAt: 'asc' },
        include: {
            candidate: { select: { name: true } },
            interviewer: { select: { name: true } }
        }
    });
}

async function updateInterview(id, updateData) {
    const { problemIds, ...rest } = updateData;
    
    const data = { ...rest };
    if (problemIds) {
        data.problems = {
            set: problemIds.map(id => ({ id }))
        };
    }

    return await prisma.interview.update({
        where: { id },
        data,
        include: { problems: true }
    });
}

async function deleteInterview(id) {
    return await prisma.interview.delete({
        where: { id }
    });
}

module.exports = {
    createInterview,
    getInterviewById,
    getInterviews,
    updateInterview,
    deleteInterview
};
