const Joi = require('joi');

const userValidatorMiddleware = async (req, res, next) => {
    const userPayload = req.body
    try {
        await userValidator.validateAsync(userPayload)
        next()
    } catch (error) {
        return res.status(406).send(error.details[0].message)
    }
}

const userValidator = Joi.object({
    firstname : Joi.string()
        .min(1)
        .max(16)
        .required(),
    lastname : Joi.string()
        .min(1)
        .max(16)
        .required(),
    password : Joi.string()
        .min(6)
        .max(16)
        .required(),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required()
})

module.exports = userValidatorMiddleware