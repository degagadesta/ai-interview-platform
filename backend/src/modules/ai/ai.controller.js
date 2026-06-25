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

async function getCodeSuggestions(req, res, next) {
    try {
        const { code, language, problemDescription } = req.body;
        if (!code || !language) {
            return res.status(400).json({
                success: false,
                message: "code and language are required"
            });
        }
        const suggestions = await aiService.getCodeSuggestions(code, language, problemDescription);
        return res.status(200).json({
            success: true,
            data: suggestions
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getFeedback,
    getCodeSuggestions
};
