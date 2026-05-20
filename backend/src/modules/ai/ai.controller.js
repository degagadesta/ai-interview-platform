const aiService = require("./ai.service");

async function getFeedback(req, res, next) {
    try {
        const { submissionId } = req.body;
        if (!submissionId) {
            return res.status(400).json({ success: false, message: "submissionId is required" });
        }
        const feedback = await aiService.getInterviewFeedback(submissionId);
        return res.status(200).json({
            success: true,
            data: feedback
        });
    } catch (error) {
        next(error);
    }
}

module.exports = { getFeedback };
