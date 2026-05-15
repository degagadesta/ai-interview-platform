const submissionRepository = require("../repositories/submission.repository");
const problemRepository = require("../../problems/problem.repository");

async function createSubmission(userId, problemId, code, language) {
    try {
        const problem = await problemRepository.getProblemById(problemId);
        if (!problem) {
            throw new Error("Problem not found");
        }

        const submission = await submissionRepository.createSubmission({
            code,
            language,
            userId,
            problemId
        });

        return submission;
    } catch (error) {
        throw error;
    }
}

async function getSubmission(id, userId) {
    try {
        const submission = await submissionRepository.getSubmissionById(id);
        if (!submission) {
            throw new Error("Submission not found");
        }
        return submission;
    } catch (error) {
        throw error;
    }
}

async function getUserSubmissions(userId) {
    try {
        return await submissionRepository.getSubmissions({ userId });
    } catch (error) {
        throw error;
    }
}

async function getAllSubmissions() {
    try {
        return await submissionRepository.getSubmissions();
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createSubmission,
    getSubmission,
    getUserSubmissions,
    getAllSubmissions
};
