const Joi = require("joi");

const scheduleInterviewSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().optional(),
    scheduledAt: Joi.date().greater('now').required(),
    interviewerId: Joi.string().required(),
    candidateId: Joi.string().required(),
    problemIds: Joi.array().items(Joi.string()).min(1).required()
});

const validateInterview = (req, res, next) => {
    const { error } = scheduleInterviewSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details[0].message
        });
    }
    next();
};

const validateInterviewId = (req, res, next) => {
    if (!req.params.id || typeof req.params.id !== 'string') {
        return res.status(400).json({
            success: false,
            message: "Invalid Interview ID"
        });
    }
    next();
};

module.exports = {
    validateInterview,
    validateInterviewId
};
