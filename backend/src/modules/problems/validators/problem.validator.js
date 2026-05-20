const Joi = require('joi');

const createProblemValidator = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    difficulty: Joi.string().valid('EASY', 'MEDIUM', 'HARD').required(),
    category: Joi.string().required(),
    slug: Joi.string().required(),
    tags: Joi.array().items(Joi.string()),
    hint: Joi.array().items(Joi.string()),
    templateCode: Joi.object().required()
});

const validateProblem = (req, res, next) => {
    const { error } = createProblemValidator.validate(req.body);
    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details[0].message
        });
    }
    next();
};

const validateProblemId = (req, res, next) => {
    if (!req.params.id || typeof req.params.id !== 'string') {
        return res.status(400).json({
            success: false,
            message: "Invalid Problem ID"
        });
    }
    next();
};

module.exports = { validateProblem, validateProblemId };
