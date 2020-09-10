const Joi = require("@hapi/joi");

/* -------------------------------------------------------------------------- */
/*                              Validation Forms                              */
/* -------------------------------------------------------------------------- */

const RegisterationValidation = Joi.object({
    name: Joi.string().min(2).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
});

const LogInValidation = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
});


module.exports.RegisterationValidation = RegisterationValidation;
module.exports.LogInValidation = LogInValidation;
