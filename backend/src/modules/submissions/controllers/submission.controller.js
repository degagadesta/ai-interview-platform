const submissionService = require("../services/submission.service");

async function submitCode(req, res, next) {
    try {
        const { problemId, code, language } = req.body;
        const userId = req.user.id;

        const submission = await submissionService.createSubmission(userId, problemId, code, language);
        
        return res.status(201).json({
            success: true,
            message: "Submission received and is being processed",
            data: submission
        });
    } catch (error) {
        next(error);
    }
}

async function getSubmission(req, res, next) {
    try {
        const submission = await submissionService.getSubmission(req.params.id, req.user.id);
        return res.status(200).json({
            success: true,
            data: submission
        });
    } catch (error) {
        next(error);
    }
}

async function getMySubmissions(req, res, next) {
    try {
        const submissions = await submissionService.getUserSubmissions(req.user.id);
        return res.status(200).json({
            success: true,
            data: submissions
        });
    } catch (error) {
        next(error);
    }
}

async function listAllSubmissions(req, res, next) {
    try {
        const submissions = await submissionService.getAllSubmissions();
        return res.status(200).json({
            success: true,
            data: submissions
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    submitCode,
    getSubmission,
    getMySubmissions,
    listAllSubmissions
};
