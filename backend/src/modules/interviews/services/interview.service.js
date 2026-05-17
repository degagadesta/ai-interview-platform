const interviewRepository = require("../repositories/interview.repository");

async function scheduleInterview(data) {
    try {
        // Here you could add logic to check if interviewer/candidate are available
        return await interviewRepository.createInterview(data);
    } catch (error) {
        throw error;
    }
}

async function getInterview(id) {
    try {
        const interview = await interviewRepository.getInterviewById(id);
        if (!interview) throw new Error("Interview not found");
        return interview;
    } catch (error) {
        throw error;
    }
}

async function listInterviews(filters) {
    try {
        return await interviewRepository.getInterviews(filters);
    } catch (error) {
        throw error;
    }
}

async function updateInterview(id, data) {
    try {
        return await interviewRepository.updateInterview(id, data);
    } catch (error) {
        throw error;
    }
}

async function cancelInterview(id) {
    try {
        return await interviewRepository.updateInterview(id, { status: 'CANCELLED' });
    } catch (error) {
        throw error;
    }
}

module.exports = {
    scheduleInterview,
    getInterview,
    listInterviews,
    updateInterview,
    cancelInterview
};
