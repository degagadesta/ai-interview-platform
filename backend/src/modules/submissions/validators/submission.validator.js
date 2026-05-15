const Joi = require("joi");

const submitCodeSchema = Joi.object({
    problemId: Joi.string().required(),
    code: Joi.string().required(),
    language: Joi.string().required()
});

const validateSubmission = (req, res, next) => {
    const { error } = submitCodeSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details[0].message
        });
    }
    next();
};

const validateSubmissionId = (req, res, next) => {
    if (!req.params.id || typeof req.params.id !== 'string') {
        return res.status(400).json({
            success: false,
            message: "Invalid Submission ID"
        });
    }
    next();
};

module.exports = {
    validateSubmission,
    validateSubmissionId
};
