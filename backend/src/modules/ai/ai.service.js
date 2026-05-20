async function getInterviewFeedback(submissionId) {
    return {
        feedback: "This is a mock AI feedback for submission " + submissionId,
        score: 85
    };
}

module.exports = { getInterviewFeedback };
