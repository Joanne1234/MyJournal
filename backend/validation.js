const Joi = require("@hapi/joi");

/* -------------------------------------------------------------------------- */
/*                              Validation Forms                              */
/* -------------------------------------------------------------------------- */

const RegisterationValidation = Joi.object({
    name: Joi.string().min(2).required(),
    email: Joi.string().min(1).required().email(),
    password: Joi.string().min(6).required(),
});

const LogInValidation = Joi.object({
    email: Joi.string().min(1).required().email(),
    password: Joi.string().min(0).required(),
});

const MoodValidation = Joi.object({
    mood: Joi.number().required(),
    comments: Joi.string().allow('')
});

const JournalValidation = Joi.object({
    title: Joi.string().min(1).required(),
    entry: Joi.string().min(6).required(),
    positives: Joi.string().min(6).required(),
    mood: Joi.number().required(),
    comments: Joi.string().allow('')
});

const ReflectionValidation = Joi.object({
    event: Joi.string().min(1).required(),
    description: Joi.string().min(6).required(),
    learnt: Joi.string().min(6).required(),
    moodBefore: Joi.number().required(),
    commentsBefore: Joi.string().allow(''),
    moodDuring: Joi.number().required(),
    commentsDuring: Joi.string().allow(''),
    moodAfter: Joi.number().required(),
    commentsAfter: Joi.string().allow(''),
    actions: Joi.string().min(6).allow(''),
    conclusion: Joi.string().min(6).allow(''),
    evaluation: Joi.string().min(6).allow(''),
    actionPlan: Joi.string().min(6).allow(''),
    extended: Joi.boolean()
});


module.exports.RegisterationValidation = RegisterationValidation;
module.exports.LogInValidation = LogInValidation;
module.exports.MoodValidation = MoodValidation;
module.exports.JournalValidation = JournalValidation;
module.exports.ReflectionValidation = ReflectionValidation;
