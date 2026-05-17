const interviewService = require("../services/interview.service");

async function scheduleInterview(req, res, next) {
    try {
        const interview = await interviewService.scheduleInterview(req.body);
        return res.status(201).json({
            success: true,
            message: "Interview scheduled successfully",
            data: interview
        });
    } catch (error) {
        next(error);
    }
}

async function getInterview(req, res, next) {
    try {
        const interview = await interviewService.getInterview(req.params.id);
        return res.status(200).json({
            success: true,
            data: interview
        });
    } catch (error) {
        next(error);
    }
}

async function getMyInterviews(req, res, next) {
    try {
        const userId = req.user.id;
        const role = req.user.role;
        
        const filters = role === 'INTERVIEWER' ? { interviewerId: userId } : { candidateId: userId };
        const interviews = await interviewService.listInterviews(filters);
        
        return res.status(200).json({
            success: true,
            data: interviews
        });
    } catch (error) {
        next(error);
    }
}

async function updateInterview(req, res, next) {
    try {
        const interview = await interviewService.updateInterview(req.params.id, req.body);
        return res.status(200).json({
            success: true,
            message: "Interview updated successfully",
            data: interview
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    scheduleInterview,
    getInterview,
    getMyInterviews,
    updateInterview
};
